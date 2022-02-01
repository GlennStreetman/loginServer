import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface props {
    hide?: boolean;
}

function BackButton(p: props) {
    const router = useRouter();

    const element =
        p.hide !== true ? (
            <button className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1" onClick={() => router.back()}>
                <div className="my-auto">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
                </div>
                <div className="my-auto">Back</div>
            </button>
        ) : (
            <div className="my-auto">
                <button className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1" onClick={() => router.back()}>
                    <div className="my-auto">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    </div>
                </button>
            </div>
        );

    return element;
}

export default BackButton;
