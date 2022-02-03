import React from "react";
import { useState } from "react";
import ButtonStandard from "../components/buttonStandard";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import ActiveLogo from "../components/activeLogo";
import LabeledInput from "../components/labeledInput";
import { emailIsValid, passwordIsValid } from "../functions/stringValidators";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [serverMessage, setServerMessage] = useState("");

    const [emailHelp, setEmailHelp] = useState<boolean | string>(false);
    const [passwordHelp, setPasswordHelp] = useState<boolean | string>(false);
    const [passwordHelp2, setPasswordHelp2] = useState<boolean | string>(false);

    const checkLogin = async (e) => {
        e.preventDefault();

        const checkEmail = emailIsValid(email);
        const checkPassword = passwordIsValid(password);
        const checkPassword2 = passwordIsValid(password2);
        const passwordMatch = password === password2;

        console.log("password help", passwordMatch, passwordHelp, passwordHelp2);

        if (checkEmail && checkPassword && checkPassword2 && passwordMatch) {
            setEmailHelp(false);
            setPasswordHelp2(false);
            setPasswordHelp(false);

            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await res.json();

            setServerMessage("id: " + data.id + " EM: " + data.email + " pw: " + data.password);
        } else {
            !checkEmail ? setEmailHelp("Enter a valid email address") : setEmailHelp(false);
            !passwordMatch ? setPasswordHelp2("Passwords do not match") : setPasswordHelp2(false);
            !checkPassword ? setPasswordHelp(">7 characters, 1 upper,  1 special.") : setPasswordHelp(false);
        }
    };

    return (
        <div className="grid grid-cols-12 bg-primary mx-1">
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 "></div>
            <div className="col-span-12 outline-4 border-2 rounded-md sm:col-span-8 md:col-span-6 lg:col-span-4  p-2 shadow-md">
                <ActiveLogo />
                <form className="flex flex-col gap-4 pb-3 justify-center" autoComplete="off">
                    <LabeledInput id="emailLabel" label="Email" value={email} onClickCallback={setEmail} helperText={emailHelp} />
                    <LabeledInput
                        id="passwordLabel"
                        label="Password"
                        value={password}
                        onClickCallback={setPassword}
                        helperText={passwordHelp}
                        fieldType={"password"}
                    />
                    <LabeledInput
                        id="passwordLabel2"
                        label="Password"
                        value={password2}
                        onClickCallback={setPassword2}
                        helperText={passwordHelp2}
                        fieldType={"password"}
                    />
                    <div className="flex flex-row justify-center">
                        <div className="grow flex justify-center gap-2">
                            <ButtonStandard
                                onClick={() => {
                                    window.history.back();
                                }}
                            >
                                Back
                            </ButtonStandard>
                            <ButtonStandard onClick={checkLogin}> Register </ButtonStandard>
                        </div>
                    </div>
                </form>
                <div className="flex flex-row gap-2 justify-center">
                    <ButtonStandard onClick={() => {}}>
                        <SiGithub className="text-xl"></SiGithub>Github Login
                    </ButtonStandard>
                    <ButtonStandard onClick={() => {}}>
                        <FcGoogle className="text-xl"></FcGoogle>Google Login
                    </ButtonStandard>
                </div>
                {serverMessage}
            </div>
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 outline-red-500"></div>
        </div>
    );
}

export default Login;
