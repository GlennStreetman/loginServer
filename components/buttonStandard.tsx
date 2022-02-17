import React from "react";

interface props {
    onClick: Function;
    children: any;
    type?: string;
    form?: string;
}

function buttonStandard(p: props) {
    const optionalProps = {};
    if (p.type) {
        optionalProps["type"] = p.type;
    } else {
        optionalProps["type"] = "button";
    }
    if (p.form) optionalProps["form"] = p.form;
    return (
        <button
            className=" flex font-bold uppercase text-primary hover:text-accent rounded-md active:bg-strong gap-1 border-2 p-2 hover:bg-secondary"
            onClick={(e) => {
                p.onClick(e);
            }}
            {...optionalProps}
        >
            {p.children}
        </button>
    );
}

export default buttonStandard;
