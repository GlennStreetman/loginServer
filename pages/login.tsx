import React from "react";
import Topper from "../components/topper";
import { useState, useEffect } from "react";
import Image from "next/image";

function Login() {
    const [email, setEmail] = useState("");
    const [emailHelpStyling, setEmailHelpStyling] = useState("absolute text-accent bg-primary  rounded-lg");
    const [password, setPassword] = useState("");
    const [passwordHelpStyling, setPasswordHelpStyling] = useState("absolute text-accent bg-primary  rounded-lg");

    // useEffect(() => {
    //     setEmail("_");
    //     setPassword("_");
    //     setTimeout(() => {
    //         setEmail("");
    //         setPassword("");
    //     }, 1);
    // }, []);

    function helperFocus(helperText: string, helperStyling: Function) {
        //on focus, move helper text to upper left side of input form, set zIndex to bring it above outline.
        helperStyling("absolute bottom-8 left-4 z-2  text-accent bg-primary rounded-lg");
    }

    function helperBlurr(fieldValue: string, helperStyling: Function) {
        //on focus, move helper text to upper left side of input form, set zIndex to bring it above outline.
        if (fieldValue === "") {
            helperStyling("absolute text-accent bg-primary p-1 rounded-lg");
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, setText: Function) {
        e.preventDefault();
        setText(e.target.value);
    }

    return (
        <div className="grid grid-cols-12 mt-12 mx-1 min-h-screen bg-primary">
            <Topper />
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 outline-red-500 "></div>
            <div className="col-span-12 outline-4 border-2 rounded-md sm:col-span-8 md:col-span-6 lg:col-span-4  p-2 shadow-md">
                <div className="text-secondary flex justify-center">
                    <Image src="/gstreet2.png" alt="logo" height="250px" width="250px" />
                </div>
                <form className="flex flex-col gap-4" autoComplete="off">
                    <div
                        className="relative rounded-md border-2 p-2 text-primary"
                        onFocus={() => helperFocus("Email", setEmailHelpStyling)}
                        onBlur={() => helperBlurr(email, setEmailHelpStyling)}
                    >
                        <label
                            htmlFor="loginEmailField"
                            className={emailHelpStyling}
                            onClick={() => {
                                document.getElementById("loginEmailField")?.focus();
                            }}
                        >
                            Email
                        </label>
                        <input
                            autoComplete="off"
                            className="bg-primary outline-none w-full "
                            id="loginEmailField"
                            type="text"
                            required
                            value={email}
                            onChange={(e) => handleChange(e, setEmail)}
                        />
                    </div>
                    <div
                        className="relative border-2 rounded-md p-2"
                        onFocus={() => helperFocus("Password", setPasswordHelpStyling)}
                        onBlur={() => helperBlurr(password, setPasswordHelpStyling)}
                    >
                        <label
                            htmlFor="passwordFiel"
                            className={passwordHelpStyling}
                            onClick={() => {
                                document.getElementById("passwordFiel")?.focus();
                            }}
                        >
                            Password
                        </label>
                        <input
                            autoComplete="off"
                            className="bg-primary outline-none w-full"
                            id="passwordFiel"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => handleChange(e, setPassword)}
                        />
                    </div>
                </form>
            </div>
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 outline-red-500"></div>
        </div>
    );
}

export default Login;

//back button
//banner
//userName
//password
//submit
//forgot login
//register
