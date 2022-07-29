import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import SlackProvider from "next-auth/providers/slack";

const prisma = new PrismaClient();

const useSecureCookies = process.env.NEXTAUTH_URL.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXTAUTH_URL).hostname;

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
            // console.log("--redirect called--", url);
            return baseUrl;
        },
        async session({ session, token, user }) {
            console.log("--Session CALLED--", session, "--user--", user, "--token--", token);
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
