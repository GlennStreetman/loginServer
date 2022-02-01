import dynamic from "next/dynamic";
import React from "react";
// import Gutter from "./gutter";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import BackButton from "./backButton";
import { useRouter } from "next/router";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

const DarkModeButton = dynamic(() => import("./darkModeButton"), { ssr: false });

function Topper() {
    const router = useRouter();

    return (
        <div className="top-0  right-3 xl:right-12 fixed flex justify-end w-screen sm:w-auto col-span-12 md:col-span-10 gap-2 p-2">
            {/* {router.pathname !== "/" ? <BackButton hide={true} /> : <></>}
            <Tippy content="View/Modify Theme" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                <Tippy content="Modify Theme" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                    {router.pathname === "/" ? (
                        <div>
                            <Link href="/colors">
                                <FontAwesomeIcon className="h-7 w-7 text-primary hover:text-accent" icon={faUserEdit} />
                            </Link>
                        </div>
                    ) : (
                        <></>
                    )}
                </Tippy>
            </Tippy> */}
            <DarkModeButton />
        </div>
    );
}

export default Topper;
