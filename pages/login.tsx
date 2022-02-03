import { useState, useEffect } from "react";
import ButtonStandard from "../components/buttonStandard";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import ActiveLogo from "../components/activeLogo";
import Link from "next/link";
import LabeledInput from "../components/labeledInput";
import { emailIsValid, passwordIsValid } from "../functions/stringValidators";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [emailHelp, setEmailHelp] = useState<boolean | string>(false);
    const [passwordHelp, setPasswordHelp] = useState<boolean | string>(false);

    const checkLogin = async (e) => {
        e.preventDefault();
        console.log("processing request:", email, password);

        const checkEmail = emailIsValid(email);
        const checkPassword = passwordIsValid(password);

        if (checkEmail && checkPassword) {
            setEmailHelp(false);
            setPasswordHelp(false);

            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await res.json();
            console.log(data);
            setServerMessage("id: " + data.id + " EM: " + data.email + " pw: " + data.password);
        } else {
            !checkEmail ? setEmailHelp("Enter Valid Email Address") : setEmailHelp(false);
            !checkPassword ? setPasswordHelp("Check Password") : setPasswordHelp(false);
        }
    };

    return (
        <div className="grid grid-cols-12 bg-primary mx-1">
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 "></div>
            <div className="col-span-12 outline-4 border-2 rounded-md sm:col-span-8 md:col-span-6 lg:col-span-4  p-2 shadow-md">
                <ActiveLogo />
                <form id="loginForm" className="flex flex-col gap-4 pb-3 justify-center" autoComplete="off">
                    <LabeledInput id="emailLabel" label="Email" value={email} onClickCallback={setEmail} helperText={emailHelp} />
                    <LabeledInput
                        id="passwordLabel"
                        label="Password"
                        value={password}
                        onClickCallback={setPassword}
                        helperText={passwordHelp}
                        fieldType={"password"}
                    />
                    <div className="flex flex-row justify-center">
                        <div className="grow flex justify-center gap-2">
                            <Link href="/register" passHref={true}>
                                <ButtonStandard onClick={() => {}}>Register</ButtonStandard>
                            </Link>
                            <ButtonStandard type="submit" form="loginForm" onClick={checkLogin}>
                                LOGIN
                            </ButtonStandard>
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
