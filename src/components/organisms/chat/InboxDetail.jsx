import React, { useEffect, useRef, useState } from "react";
import InboxDetailBody from "./components/InboxDetailBody";
import InboxDetailHeader from "./components/InboxDetailHeader";
import InboxDetailFooter from "./components/InboxDetailFooter";
import Loading from "@/components/molecules/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingAction, setMessageEditID } from "@/redux/actions/inboxSlice";

const groupMessagesByDateAndUnread = (messages) => {
    const groupedMessages = {};

    messages.forEach((message) => {
        const messageDate = new Date(message.createdAt).toDateString();

        if (!groupedMessages[messageDate]) {
            groupedMessages[messageDate] = {
                read: [],
                unread: [],
            };
        }

        if (message.isRead) {
            groupedMessages[messageDate].read.push(message);
        } else {
            groupedMessages[messageDate].unread.push(message);
        }
    });

    return groupedMessages;
};

const getParticipantsCount = (messages) => {
    const userIDs = new Set(messages.map((message) => message.userID));
    return userIDs.size;
};

export default function InboxDetail({ data, isLoading }) {
    const inboxBodyRef = useRef(null);
    const inboxAction = useSelector((state) => state.inbox);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        messages: [],
        messageEdit: "",
        loadingAction: false,
    });

    const handleState = (key, value) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    useEffect(() => {
        if (!isLoading) {
            handleState("messages", data.messages);
        }
    }, [isLoading]);

    const countParticipants = isLoading
        ? []
        : getParticipantsCount(state.messages);

    const handleDelete = (id) => {
        const updatedMessages = [...state.messages];
        const messageIndex = updatedMessages.filter(
            (message) => message.id !== id
        );

        handleState("loadingAction", true);
        dispatch(setLoadingAction(true));
        setTimeout(() => {
            dispatch(setMessageEditID(null));
            dispatch(setLoadingAction(true));
            handleState("loadingAction", false);
            handleState("messages", messageIndex);
        }, 1000);
    };

    const handleEdit = (data) => {
        const updatedMessages = [...state.messages];
        const messageIndex = updatedMessages.findIndex(
            (message) => message.id === inboxAction.messageEditID
        );
        if (messageIndex !== -1) {
            updatedMessages[messageIndex].content = data.message;
        }
        handleState("loadingAction", true);
        dispatch(setLoadingAction(true));
        setTimeout(() => {
            dispatch(setMessageEditID(null));
            handleState("loadingAction", false);
            dispatch(setLoadingAction(false));
            handleState("messages", updatedMessages);
        }, 1000);
    };

    useEffect(() => {
        if (inboxAction.messageEditID !== null) {
            const getMessage = [...state.messages];
            const filterMessage = getMessage.filter(
                (message) => message.id === inboxAction.messageEditID
            );
            handleState("messageEdit", filterMessage[0].content);
        }
    }, [inboxAction.messageEditID]);

    const handleAdd = (data) => {
        const newMessage = {
            id: new Date().getTime(),
            userID: "1",
            content: data.message,
            isRead: false,
            createdAt: new Date().toISOString(),
            fullName: "Jhon Doe",
            profilePicture: "https://picsum.photos/200/200",
        };

        const updatedMessages = [...state.messages];
        const getMessageUnRead = updatedMessages.filter((message) => {
            return !message.isRead;
        });

        if (getMessageUnRead.length > 0) {
            getMessageUnRead.forEach((message) => {
                message.isRead = true;
            });
        }
        const newMessages = [...updatedMessages, newMessage];
        handleState("loadingAction", true);
        setTimeout(() => {
            handleState("messages", newMessages);
            handleState("loadingAction", false);
        }, 1000);
    };

    const messagesData = groupMessagesByDateAndUnread(state.messages);

    return (
        <div className="flex flex-col w-full h-full">
            <div key={1} className="h-20">
                <InboxDetailHeader
                    name={isLoading ? "..." : data.name}
                    participants={countParticipants}
                />
            </div>

            <div
                key={2}
                className="flex flex-col justify-center h-full overflow-auto"
                ref={inboxBodyRef}
            >
                {isLoading ? (
                    <Loading className="text-primary-dark h-6 w-6 mx-auto">
                        Loading Messages
                    </Loading>
                ) : (
                    <InboxDetailBody
                        messages={messagesData}
                        handleDelete={handleDelete}
                    />
                )}
            </div>

            <div key={3} className="h-20">
                <InboxDetailFooter
                    handleAdd={handleAdd}
                    handleEdit={handleEdit}
                    isLoading={state.loadingAction}
                    messageEdit={state.messageEdit}
                />
            </div>
        </div>
    );
}
