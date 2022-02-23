import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import LoginHeader from "./../components/loginHeader";
import Button from "../components/buttonStandard";
import Link from "next/link";

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

const Home: NextPage = () => {
    const [thisSession, setThisSession] = useState<sessionInt>({});

    useEffect(() => {
        async function getSessionObject() {
            const sessionDataRaw = await fetch("/api/auth/session");
            const sessionData = await sessionDataRaw.json();
            setThisSession(sessionData);
        }
        getSessionObject();
    }, []);

    return (
        <div className={styles.container}>
            <LoginHeader />
            <main className={styles.main}>
                <div>API SESSION STATUS</div>
                <div>Session expires: {thisSession?.expires ? thisSession.expires : "Not Logged In"}</div>
                {thisSession?.user ? mapUser(thisSession.user) : "No user"}

                        <div>
                            <Button onClick={() => {}}>
                                <a href='https://blog.gstreet.test'>Blog</a>
                            </Button>
                        </div>

                
            </main>
        </div>
    );
};

export default Home;
