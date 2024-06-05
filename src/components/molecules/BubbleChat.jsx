import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";

const bgColors = [
    "bg-chat-lightPurple",
    "bg-chat-lightGreen",
    "bg-chat-lightOrange",
];
const colors = [
    "text-chat-badge-purple",
    "text-chat-badge-green",
    "text-chat-badge-orange",
];
const setBgColor = (userID) => {
    return userID % 2 === 0
        ? bgColors[0]
        : userID % 3 === 0
        ? bgColors[1]
        : bgColors[2];
};

const setColor = (userID) => {
    return userID % 2 === 0
        ? colors[0]
        : userID % 3 === 0
        ? colors[1]
        : colors[2];
};

export default function BubbleChat({
    id,
    userID,
    children,
    sender,
    className = "",
    isLeft = true,
    setCoordinatesMenu,
    isLoadingAction,
}) {
    const background = setBgColor(userID);
    const color = setColor(userID);
    const alignElement = !isLeft ? "justify-start" : "justify-end";
    const namePosition = !isLeft ? "left-0" : "right-0";
    const senderName = !isLeft ? sender : "You";
    const actionPosition = !isLeft ? "-right-5" : "-left-5";

    const handleGetCoordinatesMenu = (event) => {
        setCoordinatesMenu(id, event);
    };

    return (
        <div className={`w-full flex mb-8 ${alignElement}`}>
            <div
                className={`relative w-[80%] p-3 border rounded-[5px] h-auto ${className} ${background}`}
            >
                <span
                    className={`absolute -top-5 text-xs ${namePosition} ${color}`}
                >
                    {senderName}
                </span>
                <p className="text-xs text-primary-dark">{children}</p>
                {isLoadingAction ? (
                    <Loading
                        className={`h-[12px] w-[12px] absolute -top-0 cursor-pointer ${actionPosition}`}
                    />
                ) : (
                    <span
                        className={`font-bold absolute -top-3 cursor-pointer ${actionPosition}`}
                        onClick={handleGetCoordinatesMenu}
                    >
                        ...
                    </span>
                )}
            </div>
        </div>
    );
}
