import React from "react";
import loadingIcon from "@/assets/icons/loading.svg";
import Icon from "../atoms/Icon";

export default function Loading({ children, className }) {
    return (
        <div className={`text-center w-fit ${className}`}>
            <Icon src={loadingIcon} className={`h-full w-full mx-auto`} />
            <span className="text-xs">{children}</span>
        </div>
    );
}
