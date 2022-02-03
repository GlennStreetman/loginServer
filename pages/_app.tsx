import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserPrefs from "../components/userPrefs";
import { useEffect } from "react";

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

    return (
        <>
            <UserPrefs />
            <div className="font-body pt-7 bg-primary min-h-screen">
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;
