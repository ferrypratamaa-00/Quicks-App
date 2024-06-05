import React from "react";

export default function SeparatorChat({ children, color }) {
    return (
        <div className="flex items-center my-4">
            <div className={`flex-grow border-t-2 border-${color}`}></div>
            <span className={`mx-4 text-xs text-${color}`}>{children}</span>
            <div className={`flex-grow border-t-2 border-${color}`}></div>
        </div>
    );
}
