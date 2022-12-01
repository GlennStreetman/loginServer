import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import SlackProvider from "next-auth/providers/slack";
import { createTransport } from "nodemailer"

const prisma = new PrismaClient();

const useSecureCookies = process.env.NEXT_PUBLIC_NEXTAUTH_HTTPS === "true" ? true: false;
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXTAUTH_URL).hostname

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: async function custom(params) {
                const { host } = new URL(process.env.NEXTAUTH_URL)
                const { identifier, url, provider, theme } = params
                // NOTE: You are not required to use `nodemailer`, use whatever you want.
                const transport = createTransport(provider.server)
                const result = await transport.sendMail({
                  to: identifier,
                  from: provider.from,
                  subject: `Sign in to ${host}`,
                  text: text({ url, host }),
                  html: html({ url, host, theme }),
                })
                const failed = result.rejected.concat(result.pending).filter(Boolean)
                if (failed.length) {
                  throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
                }
              },

        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        SlackProvider({
            clientId: process.env.SLACK_CLIENT_ID,
            clientSecret: process.env.SLACK_CLIENT_SECRET,
        }),
    ],
    secret: process.env.SECRET,

    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    cookies: {
        sessionToken: {
            name: `${cookiePrefix}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                domain: hostName == "localhost" ? hostName : "." + hostName, // add a . in front so that subdomains are included
            },
        },
    },

    pages: {
        signIn: "/login", // Displays signin buttons
    },

    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     console.log("--signin called--", user);
        //     // const session = await getSession();
        //     // console.log("session", session);
        //     return true;
        //     // return `/login?email=${user.email}`;
        // },
        async redirect({ url, baseUrl }) {
            // console.log("--redirect called--", url, baseUrl);
            const basePath = `${baseUrl}/${process.env.NEXT_PUBLIC_ENTERYPOINT}`
            return basePath;
        },
        async session({ session, token, user }) {
            // console.log("--Session CALLED--", session, "--user--", user, "--token--", token);
            session.user.roll = user.roll;
            return session;
        },
        // async jwt({ token, user, account, profile, isNewUser }) {
        //     console.log("--JWT CALLED--", "--user--", user, "--account--", account, "--profile--", profile, "email", email, "creds", credentials);
        //     return token;
        // },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {
        signIn: ({ user, account, profile, isNewUser }) => {
            console.log("signIN:", user, account, profile, isNewUser);
        },
    },

    // You can set the theme to 'light', 'dark' or use 'auto' to default to the
    // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
    theme: {
        colorScheme: "light",
    },

    // Enable debug messages in the console if you are having problems
    debug: process.env.DEBUG,
});

function html(params) {
  const { url, host, theme } = params
  console.log('--URL--',url,"HOST", host,"THEME", theme)
  const escapedHost = host.replace(/\./g, "&#8203;.")
  const entryPoint = `${url}`
  const brandColor = theme.brandColor || "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${entryPoint}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`
}