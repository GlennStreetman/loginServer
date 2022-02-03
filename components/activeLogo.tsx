import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./activeLogo.module.css";
import { useState, useEffect } from "react";
const DarkModeButton = dynamic(() => import("../components/darkModeButton"), { ssr: false });

function ActiveLogo() {
    const [darkStyle, setDarkStyle] = useState(styles.hidden);
    const [darkStyleOn, setDarkStyleOn] = useState(styles.hidden);
    const [lightStyle, setLightStyle] = useState(styles.hidden);
    const [lightStyleOn, setLightStyleOn] = useState(styles.hidden);

    const darkModeCallback = () => {
        const lightSwitches = {
            darkOff: setDarkStyle,
            darkOn: setDarkStyleOn,
            lightOff: setLightStyle,
            lightOn: setLightStyleOn,
        };
        const mode = localStorage.siteDarkMode == "true" ? "darkOff" : "lightOff";
        // if (typeof window !== "undefined" && localStorage) {

        Object.entries(lightSwitches).forEach(([key, val]) => {
            if (mode === key) {
                val(styles.visable);
            } else {
                val(styles.hidden);
            }
        });
    };

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            if (localStorage.siteDarkMode == "true") {
                console.log("setting dark");
                setDarkStyle(styles.visable);
            } else {
                console.log("setting light");
                setLightStyle(styles.visable);
            }
        }
    }, []);

    const toggleLights = (on: any, num: string) => {
        console.log("setting visable", on, num);
        const lightSwitches = {
            darkOff: setDarkStyle,
            darkOn: setDarkStyleOn,
            lightOff: setLightStyle,
            lightOn: setLightStyleOn,
        };

        Object.entries(lightSwitches).forEach(([key, val]) => {
            console.log(key, val);
            if (on === key) {
                val(styles.visable);
            } else {
                val(styles.hidden);
            }
        });
    };

    return (
        <div className={styles.imgBox}>
            <div className="absolute top right-1">
                <DarkModeButton secondary={darkModeCallback} />
            </div>
            <div className={darkStyle}>
                <Image id="darkOff" src="/gstreetDarkOff.png" alt="logo" height="250px" width="250px" onClick={() => toggleLights("darkOn", "1")} />
            </div>
            <div className={darkStyleOn}>
                <Image id="darkOn" src="/gstreetDarkOn.png" alt="logo" height="250px" width="250px" onClick={() => toggleLights("darkOff", "2")} />
            </div>
            <div className={lightStyle}>
                <Image id="lightOff" src="/gstreetLightOff.png" alt="logo" height="250px" width="250px" onClick={() => toggleLights("lightOn", "3")} />
            </div>
            <div className={lightStyleOn}>
                <Image id="lightOn" src="/gstreetLightOn.png" alt="logo" height="250px" width="250px" onClick={() => toggleLights("lightOff", "4")} />
            </div>
        </div>
    );
}

export default ActiveLogo;
