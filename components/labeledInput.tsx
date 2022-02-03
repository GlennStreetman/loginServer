import { useState, useEffect } from "react";

interface props {
    id: string;
    label: string;
    value: string;
    onClickCallback: Function;
    helperText?: any; //can be text or jsx object
    fieldType?: string;
}

function LabeledInput(p: props) {
    const [labelStyling, setLabelStyling] = useState("absolute text-accent bg-primary ");
    const helperStyleing = "absolute bottom-8 left-4 z-2 text-red-700 bg-primary";

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, callback: Function) {
        e.preventDefault();
        callback(e.target.value);
    }

    function helperFocus(helperStyling: Function) {
        //on focus, move helper text to upper left side of input form, set zIndex to bring it above outline.
        helperStyling("absolute bottom-8 left-4 z-2  text-accent bg-primary");
    }

    function helperBlurr(fieldValue: string, helperStyling: Function) {
        //on focus, move helper text to upper left side of input form, set zIndex to bring it above outline.
        if (fieldValue === "") {
            helperStyling("absolute text-accent bg-primary p-1");
        }
    }

    return (
        <div
            className="relative rounded-md border-2 p-2 text-primary"
            onFocus={() => helperFocus(setLabelStyling)}
            onBlur={() => helperBlurr(p.value, setLabelStyling)}
        >
            <label
                className={p.helperText ? helperStyleing : labelStyling}
                onClick={() => {
                    document.getElementById(p.id)?.focus();
                }}
            >
                {p.helperText ? p.helperText : p.label}
            </label>
            <input
                autoComplete="off"
                className="bg-primary outline-none w-full "
                id={p.id}
                type={p.fieldType ? p.fieldType : "text"}
                required
                value={p.value}
                onChange={(e) => handleChange(e, p.onClickCallback)}
            />
        </div>
    );
}

export default LabeledInput;
