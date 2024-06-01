import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Icon from "../atoms/Icon";
import InboxIcon from "../../assets/icons/Group 1906.svg";
import InboxActiveIcon from "../../assets/icons/Group 1908.svg";
import TaskIcon from "../../assets/icons/Group 1662.svg";
import TaskActiveIcon from "../../assets/icons/Group 1907.svg";
import { animated, useSpring, useTrail } from "@react-spring/web";

const icons = {
    task: { default: TaskIcon, active: TaskActiveIcon },
    inbox: { default: InboxIcon, active: InboxActiveIcon },
};

const ActionButton = ({
    open,
    showCaption,
    onClick,
    iconType,
    label,
    color,
    shadow,
    style,
}) => {
    return (
        <animated.div
            className={`relative ${open ? "order-1" : "order-none"}`}
            style={style}
        >
            {showCaption && (
                <p className="absolute bottom-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-xs mb-1.5">
                    {label}
                </p>
            )}
            <Button
                variant="circle"
                size="icon"
                color={open ? color : "white"}
                className={open ? shadow : ""}
                onClick={onClick}
            >
                <Icon
                    src={
                        open ? icons[iconType].active : icons[iconType].default
                    }
                />
            </Button>
        </animated.div>
    );
};

export default function FloatingAction({ state, onToggleClick }) {
    const shadow =
        "shadow-[-10px_0px_0px_rgba(255,255,255,0.4)] ms-2 h-12 w-12";

    const actionAnimation = useSpring({
        transform: `translateX(${state.openAction ? -1 : 0}rem)`,
        config: { tension: 200, friction: 20 },
    });

    const trail = useTrail(2, {
        opacity: state.openAction ? 1 : 0,
        transform: state.openAction ? "translateX(0)" : "translateX(1rem)",
        from: { opacity: 0, transform: "translateX(1rem)" },
        config: { tension: 200, friction: 20 },
    });
    return (
        <div className="fixed bottom-5 right-5 flex flex-row items-center">
            <animated.div
                className="flex flex-row gap-x-3 items-center"
                style={actionAnimation}
            >
                {trail.map((props, index) => (
                    <ActionButton
                        key={index}
                        open={index === 0 ? state.openTask : state.openInbox}
                        showCaption={!state.openTask && !state.openInbox}
                        onClick={() => {
                            if (index === 0) {
                                onToggleClick("openTask", !state.openTask);
                                onToggleClick("openInbox", false);
                            } else {
                                onToggleClick("openInbox", !state.openInbox);
                                onToggleClick("openTask", false);
                            }
                        }}
                        iconType={index === 0 ? "task" : "inbox"}
                        label={index === 0 ? "Task" : "Inbox"}
                        color={index === 0 ? "orange" : "purple"}
                        shadow={shadow}
                        style={props}
                    />
                ))}
            </animated.div>
            {!state.openTask && !state.openInbox && (
                <Button
                    key={3}
                    variant="circle"
                    size="icon"
                    onClick={() =>
                        onToggleClick("openAction", !state.openAction)
                    }
                    className="h-12 w-12"
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
            )}
        </div>
    );
}
