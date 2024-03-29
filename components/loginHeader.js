// import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";
// import ButtonStandard from "../components/buttonStandard";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

const baseURL = `${process.env.NEXT_PUBLIC_NEXTAUTH_HTTPS}://${process.env.NEXT_PUBLIC_baseDomain}/${process.env.NEXT_PUBLIC_ENTERYPOINT}`

export default function Header() {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    // console.log("header variables", session, status);
    return (
        <header>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <div className={styles.signedInStatus}>
                <p className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
                    {!session && (
                        <>
                            <span className={styles.notSignedInText}>You are not signed in</span>
                            <a
                                href={`${baseURL}/login`}
                                className={styles.buttonPrimary}
                                // onClick={(e) => {
                                    
                                //     e.preventDefault();
                                //     signIn();
                                // }}
                            >
                                Sign in
                            </a>
                        </>
                    )}
                    {session && (
                        <>
                            {session.user.image && <span style={{ backgroundImage: `url('${session.user.image}')` }} className={styles.avatar} />}
                            <span className={styles.signedInText}>
                                <small>Signed in as</small>
                                <br />
                                <strong>{session.user.email || session.user.name}</strong>
                            </span>
                            <a
                                href={`${baseURL}/api/auth/signout`}
                                className={styles.button}
                                onClick={(e) => {
                                    e.preventDefault();
                                    signOut();
                                }}
                            >
                                Sign out
                            </a>
                        </>
                    )}
                </p>
            </div>
        </header>
    );
}
