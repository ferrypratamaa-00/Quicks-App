import React, { useEffect, useState } from "react";
import MainTemplate from "../templates/MainTemplate";
import { Button } from "../ui/button";
import Icon from "../atoms/Icon";
import InboxIcon from "../../assets/icons/Group 1906.svg";
import InboxActiveIcon from "../../assets/icons/Group 1908.svg";
import TaskIcon from "../../assets/icons/Group 1662.svg";
import TaskActiveIcon from "../../assets/icons/Group 1907.svg";

// Komponen untuk tombol dengan ikon
function ActionButton({ icon, text, active, className }) {
    return (
        <div
            className={`absolute bottom-1 transform transition-all ${className}`}
        >
            <p
                className={`text-xs text-center text-white mb-1 ${
                    !active && "hidden"
                }`}
            >
                {text}
            </p>
            <Button variant="circle" size="icon" className={`bg-white`}>
                <Icon src={icon} />
            </Button>
        </div>
    );
}

export default function Home() {
    const [actionActive, setActionActive] = useState(false);

    const actionActiveHandle = () => {
        setActionActive(!actionActive);
    };

    useEffect(() => {
        console.log(actionActive);
    }, [actionActive]);

    return (
        <MainTemplate>
            <div
                id="action-button"
                className="flex flex-row items-center fixed bottom-5 right-5"
            >
                <ActionButton
                    icon={TaskIcon}
                    text="Task"
                    active={actionActive}
                    className={`right-${actionActive ? "[6.5rem]" : "1"}`}
                />
                <ActionButton
                    icon={InboxIcon}
                    text="Inbox"
                    active={actionActive}
                    className={`right-${actionActive ? "[3.5rem]" : "1"}`}
                />
                <Button
                    variant="circle"
                    size="icon"
                    color="primary"
                    className="h-12 w-12 absolute bottom-0 right-0"
                    onClick={actionActiveHandle}
                >
                    <svg
                        className="h-7 w-7"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="icon"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M31.4427 12.3359C32.3618 12.9486 32.6101 14.1903 31.9974 15.1094L24.737 26H35C35.7376 26 36.4153 26.4059 36.7634 27.0563C37.1114 27.7066 37.0732 28.4957 36.6641 29.1094L27.3308 43.1094C26.7181 44.0284 25.4763 44.2768 24.5573 43.6641C23.6382 43.0514 23.3899 41.8096 24.0026 40.8906L31.263 30H21C20.2624 30 19.5847 29.594 19.2367 28.9437C18.8886 28.2934 18.9268 27.5043 19.3359 26.8906L28.6692 12.8906C29.2819 11.9715 30.5237 11.7232 31.4427 12.3359Z"
                            fill="white"
                        />
                    </svg>
                </Button>
            </div>
        </MainTemplate>
    );
}
