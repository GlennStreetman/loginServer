import { useState, useEffect } from "react";
import ButtonStandard from "../components/buttonStandard";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import ActiveLogo from "../components/activeLogo";
import LabeledInput from "../components/labeledInput";
import { emailIsValid } from "../functions/stringValidators";
import { getProviders, signIn, getSession, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

const basePath = process.env.NEXT_PUBLIC_ENTERYPOINT

Login.getInitialProps = async (context) => {
    //if already signed in redirect to homepage.
    const { req, res } = context;
    // console.log('context', res)
    const session = await getSession({ req });
    // console.log('session', session)
    const userEmail = session?.userEmail ? session.userEmail : undefined;
    if (session && res) {
        res.writeHead(302, {
            Location: `/${basePath}`,
        });
        res.end();
        return;
    }
    return {
        email: userEmail,
        providers: await getProviders(),
        csrfToken: await getCsrfToken(context), //email signin only
    };
};

interface props {
    email: string | undefined;
    providers: any;
    csrfToken: any;
}

function checkRedirect() {
    // console.log("checking redirect");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let redirect = urlParams.get("redirect");
    redirect?.replaceAll('blog', '')
    if (redirect) {
        console.log("my redirect", redirect);
        document.cookie = `redirect=${redirect}; Max-Age=3600`;
    } else {
        // console.log("no redirect");
    }
}

function Login(p: props) {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [emailHelp, setEmailHelp] = useState<boolean | string>(false);

    useEffect(() => {
        checkRedirect();
        if (router.query.error === "OAuthAccountNotLinked") {
            setServerMessage(
                'Associated login email already used with previous login provider. Use "Login with email" or select previously used login provider.'
            );
        }
    }, []);

    const emailLogin = async (e) => {
        e.preventDefault();

        const checkEmail = emailIsValid(email);
        if (checkEmail) {
            setEmailHelp(false);
            fetch(`/${basePath}/api/auth/signin/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, csrfToken: p.csrfToken }),
            }).catch((error) => {
                console.error("Error:", error);
            });
            setServerMessage(`Check provided email account for login instructions.`);
        } else {
            !checkEmail ? setEmailHelp("Enter Valid Email Address") : setEmailHelp(false);
        }
    };

    return (
        <div className="grid grid-cols-12 bg-primary mx-1">
            <div className=" col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 "></div>
            {/* <div className="flex flex-col"> */}
            <div className="col-span-12  sm:col-span-8 md:col-span-6 lg:col-span-4 ">
                <div className="outline-4 border-2 rounded-md  p-2 shadow-md mb-4">
                    <ActiveLogo />
                    <form id="loginForm" className="flex flex-col gap-2 justify-center" autoComplete="off">
                        <LabeledInput id="emailLabel" label="Email" value={email} onClickCallback={setEmail} helperText={emailHelp} />
                        <div className="flex flex-row justify-center">
                            <div className="flex justify-center gap-2"></div>
                        </div>
                    </form>
                    <div className="flex flex-col gap-2 justify-center">
                        <ButtonStandard type="submit" form="loginForm" onClick={emailLogin}>
                            <AiOutlineMail className="text-xl" />
                            Login with Email
                        </ButtonStandard>
                        <ButtonStandard
                            onClick={() => {
                                signIn(p.providers.google.id);
                            }}
                        >
                            <FcGoogle className="text-xl" />
                            Login with Google
                        </ButtonStandard>
                        <ButtonStandard
                            onClick={() => {
                                signIn(p.providers.github.id);
                            }}
                        >
                            <SiGithub className="text-xl" />
                            Login with Github
                        </ButtonStandard>
                        <ButtonStandard
                            onClick={() => {
                                signIn(p.providers.slack.id);
                            }}
                        >
                            <SiGithub className="text-xl" />
                            Login with Slack
                        </ButtonStandard>
                    </div>
                </div>
                <div className="text-sm text-accent">
                    <p className="text-center">{serverMessage}</p>
                </div>
            </div>

            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 outline-red-500"></div>
        </div>
    );
}

export default Login;
