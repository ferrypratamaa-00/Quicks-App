import React from "react";

export default function Icon({ src, className }) {
    return <img src={src} className={`h-5 w-5 ${className}`} alt="icon" />;
}
