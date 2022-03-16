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

function mapUser(user) {
    const userMap = Object.entries(user).map(([key, val]) => {
        return <div key={key + "key"}>{`${key}: ${val}`}</div>;
    });
    return userMap;
}

function setDarkStyle(){
    const mode = localStorage ? localStorage.siteDarkMode : false
    return mode
}

const Home: NextPage = () => {
    const [thisSession, setThisSession] = useState<sessionInt>({});
    const [darkMode] = useState(false)

    useEffect(() => {
        async function getSessionObject() {
            const sessionDataRaw = await fetch("/api/auth/session");
            const sessionData = await sessionDataRaw.json();
            setThisSession(sessionData);
        }
        getSessionObject();
        setDarkStyle()
    }, []);

    return (
        <div className={styles.container}>
            <LoginHeader />
            <main className={styles.main}>
                {/* <div>API SESSION STATUS</div>
                <div>Session expires: {thisSession?.expires ? thisSession.expires : "Not Logged In"}</div>
                {thisSession?.user ? mapUser(thisSession.user) : "No user"} */}

                        <div>
                            <Button onClick={() => {}}>
                                <a href='https://blog.gstreet.test'>
                                { darkMode === true ?
                                    <Image id="darkOn" src="/gstreetDarkOn.png" alt="logo" height="250px" width="250px" /> :
                                    <Image id="lightOn" src="/gstreetLightOn.png" alt="logo" height="250px" width="250px" />     
                                }
                                </a>
                            </Button>
                        </div>

                        <div>
                            <Button onClick={() => {}}>
                                <a href='https://finndash.gstreet.test'> <Image id="finnhubSplash" src="/splashLogo.png" alt="logo" height="250px" width="250px" />  </a>
                            </Button>
                        </div>

            </main>
        </div>
    );
};

export default Home;
