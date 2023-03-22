import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import LoginHeader from "./../components/loginHeader";
import Button from "../components/buttonStandard";
import Image from "next/image";

interface user {
    email?: string;
    image?: string;
    name?: string;
}

interface sessionInt {
    expires?: string;
    user?: user;
}

//map user useful for debugging.

// function mapUser(user) {
//     const userMap = Object.entries(user).map(([key, val]) => {
//         return <div key={key + "key"}>{`${key}: ${val}`}</div>;
//     });
//     return userMap;
// }

{/* <div>API SESSION STATUS</div>
<div>Session expires: {thisSession?.expires ? thisSession.expires : "Not Logged In"}</div>
{thisSession?.user ? mapUser(thisSession.user) : "No user"} */}

function setDarkStyle() {
    const mode = localStorage ? localStorage.siteDarkMode : false;
    return mode;
}

const httpProtocol = process.env.NEXT_PUBLIC_NEXTAUTH_HTTPS === "https" ? "https" : "http";

function checkRedirect(thisSession: sessionInt) {
    const cookieValues = document.cookie.split(";").reduce((prev, curr) => {
        let [key, val] = curr.split("=");
        prev[key.trim()] = val ? val.trim() : "";
        return prev;
    }, {});
    if (thisSession.expires && cookieValues["redirect"] !== undefined) {
        let cookieParse = cookieValues["redirect"].replaceAll('blog', '')
        document.cookie = `redirect=; Max-Age=0`;
        window.location.href = `${httpProtocol}://${process.env.NEXT_PUBLIC_baseDomain}/${cookieParse}`;
    }
}

const entryPoint = process.env.NEXT_PUBLIC_ENTERYPOINT

const Home: NextPage = () => {
    const [thisSession, setThisSession] = useState<sessionInt>({});
    const [darkMode] = useState(false);

    useEffect(() => {
        async function getSessionObject() {
            const sessionDataRaw = await fetch(`${entryPoint}/api/auth/session`);
            const sessionData = await sessionDataRaw.json();
            setThisSession(sessionData);
        }
        getSessionObject();
        setDarkStyle();
    }, []);

    useEffect(() => {
        checkRedirect(thisSession);
    }, [thisSession]);

    return (
        <div className={styles.container}>
            <LoginHeader />
            <main className={styles.main}>
                <div>
                    <Button onClick={() => { }}>
                        <a href={`http://gstreet${process.env.NEXT_PUBLIC_TOP}`}>
                            {darkMode === true ? (
                                <Image id="darkOn" src="/login/gstreetDarkOn.png" alt="logo" height="250px" width="250px" />
                            ) : (
                                <Image id="lightOn" src={`/${entryPoint}/gstreetLightOn.png`} alt="logo" height="250px" width="250px" />
                            )}
                        </a>
                    </Button>
                </div>

                <div>
                    <Button onClick={() => { }}>
                        <a href={`http://finndash.gstreet${process.env.NEXT_PUBLIC_TOP}/about`}>
                            {" "}
                            <Image id="finnhubSplash" src={`/${entryPoint}/splashLogo.png`} alt="logo" height="250px" width="250px" />{" "}
                        </a>
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Home;


