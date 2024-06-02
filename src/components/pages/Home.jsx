import React, { useEffect, useState } from "react";
import MainTemplate from "../templates/MainTemplate";
import FloatingAction from "../molecules/FloatingAction";

export default function Home() {
    const [floatingState, setFloatingState] = useState({
        openAction: false,
        openTask: false,
        openInbox: false,
    });

    const handleToggleClick = (key, value) => {
        setFloatingState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    return (
        <MainTemplate>
            <FloatingAction
                state={floatingState}
                onToggleClick={handleToggleClick}
            />
        </MainTemplate>
    );
}
