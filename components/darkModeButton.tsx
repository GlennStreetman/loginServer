import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

interface props {
    secondary?: Function;
}

function DarkModeButton(p: props) {
    const [darkMode, setDarkMode] = useState(Object.values(document.documentElement.classList).includes("dark"));

    return (
        <div className="my-auto">
            <button
                onClick={() => {
                    if (darkMode) {
                        document.documentElement.classList.add("light");
                        document.documentElement.classList.add("userLight");
                        document.documentElement.classList.remove("dark");
                        document.documentElement.classList.remove("userDark");
                        localStorage.setItem("siteDarkMode", "false");
                        setDarkMode(false);
                    } else {
                        document.documentElement.classList.add("dark");
                        document.documentElement.classList.add("userDark");
                        document.documentElement.classList.remove("light");
                        document.documentElement.classList.remove("userLight");
                        localStorage.setItem("siteDarkMode", "true");
                        setDarkMode(true);
                    }
                    if (p.secondary) p.secondary();
                }}
            >
                {darkMode ? (
                    <FontAwesomeIcon className="h-7 w-7 text-primary hover:text-accent" icon={faSun} />
                ) : (
                    <FontAwesomeIcon className="h-7 w-7 text-primary hover:text-accent" icon={faMoon} />
                )}
            </button>
        </div>
    );
}

export default DarkModeButton;
