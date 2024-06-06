import React, { useState, useRef, useEffect } from "react";
import SeparatorChat from "@/components/molecules/SeparatorChat";
import BubbleChat from "@/components/molecules/BubbleChat";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingAction, setMessageEditID } from "@/redux/actions/inboxSlice";

export default function InboxDetailBody({ messages, handleDelete }) {
    const dispatch = useDispatch();
    const inboxAction = useSelector((state) => state.inbox);
    const containerRef = useRef(null);

    const [state, setState] = useState({
        open: false,
        messageID: null,
        isLoadingAction: false,
        menuPosition: {
            x: 0,
            y: 0,
        },
    });

    const handleState = (key, value) => {
        setState((prevState) => {
            return {
                ...prevState,
                [key]: value,
            };
        });
    };

    const selectedMessage = (id, event) => {
        event.stopPropagation();
        const containerRect = containerRef.current.getBoundingClientRect();
        handleState("messageID", id);
        handleState("menuPosition", {
            x: event.clientX - containerRect.left + 14,
            y: event.clientY - containerRect.top + 64,
        });
        handleState("open", true);
    };

    const scrollToBottom = () => {
        const section = containerRef.current;
        section.scrollTo({
            top: section.scrollHeight + 50,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const ActionMenu = () => {
        return (
            <div
                className="flex flex-col z-20 w-20 bg-white border rounded"
                style={{
                    position: "absolute",
                    left: `${state.menuPosition.x}px`,
                    top: `${state.menuPosition.y}px`,
                }}
            >
                <div>
                    <button
                        className="bg-white w-full rounded-none hover:bg-primary-light text-xs text-primary py-0 h-7"
                        onClick={() => {
                            dispatch(setMessageEditID(state.messageID));
                        }}
                    >
                        Edit
                    </button>
                </div>
                <hr />
                <div>
                    <button
                        className="bg-white w-full rounded-none hover:bg-primary-light text-xs text-indicator-red py-0 h-7"
                        onClick={() => {
                            handleDelete(state.messageID);
                            dispatch(setLoadingAction(true));
                            handleState("isLoadingAction", true);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    };

    const renderMessages = (messages) =>
        messages.map((message) => (
            <BubbleChat
                key={message.id}
                id={message.id}
                userID={message.userID}
                sender={message.fullName}
                time={new Date(message.createdAt).toLocaleTimeString()}
                isLeft={message.userID == 1}
                setCoordinatesMenu={selectedMessage}
                isLoadingAction={
                    (state.isLoadingAction || inboxAction.loadingAction) &&
                    (inboxAction.messageEditID === message.id ||
                        state.messageID === message.id)
                }
            >
                {message.content}
            </BubbleChat>
        ));

    return (
        <div
            className={`overflow-auto px-8`}
            onClick={() => handleState("open", false)}
            ref={containerRef}
        >
            {state.open && <ActionMenu />}
            {Object.keys(messages).map((date) => (
                <div key={date}>
                    {messages[date].read.length > 0 && (
                        <>
                            <SeparatorChat color="primary-dark">
                                {date}
                            </SeparatorChat>
                            {renderMessages(messages[date].read)}
                        </>
                    )}
                    {messages[date].unread.length > 0 && (
                        <>
                            {messages[date].unread.some(
                                (message) => message.userID !== "1"
                            ) && (
                                <SeparatorChat color="indicator-red">
                                    New Message
                                </SeparatorChat>
                            )}
                            {renderMessages(messages[date].unread)}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
