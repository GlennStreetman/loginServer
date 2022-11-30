import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserPrefs from "../components/userPrefs";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {
        if (localStorage.siteDarkMode === "true" || (!("siteDarkMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.add("userDark");
            document.documentElement.classList.remove("light");
            document.documentElement.classList.remove("userLight");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.add("userLight");
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.remove("userDark");
        }
    }, []);

    // console.log('custom sesssion route:', `/${process.env.NEXT_PUBLIC_ENTERYPOINT}/api/auth`)

    return (
        <>
            <SessionProvider
                basePath={`/${process.env.NEXT_PUBLIC_ENTERYPOINT}/api/auth`}
                // Provider options are not required but can be useful in situations where
                // you have a short session maxAge time. Shown here with default values.
                // @ts-ignore
                options={{
                    // Stale Time controls how often the useSession in the client should
                    // contact the server to sync the session state. Value in seconds.
                    // e.g.
                    // * 0  - Disabled (always use cache value)
                    // * 60 - Sync session state with server if it's older than 60 seconds
                    staleTime: 0,
                    // Refetch Interval tells windows / tabs that are signed in to keep sending
                    // a keep alive request (which extends the current session expiry) to
                    // prevent sessions in open windows from expiring. Value in seconds.
                    //
                    // Note: If a session has expired when keep alive is triggered, all open
                    // windows / tabs will be updated to reflect the user is signed out.
                    refetchInterval: 0,
                }}
            >
                <UserPrefs />
                <div className="font-body pt-7 bg-primary min-h-screen">
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </>
    );
}

export default MyApp;
