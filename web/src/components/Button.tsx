import cx from "clsx";
import React from "react";

export interface ButtonProps {
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

export const Button = React.memo((props: ButtonProps) => {
    return (
        <button className={cx("button", props.className)} type={props.type || "button"} disabled={props.disabled} onClick={props.onClick}>
            {props.children}
        </button>
    );
});
