import React from "react";
import { Button } from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import backIcon from "@/assets/icons/Group 1921.svg";
import closeIcon from "@/assets/icons/icon/navigation/close_24px_dark.svg";
import { useDispatch } from "react-redux";
import {
    toggleDetail,
    toggleFloatingMenu,
} from "@/redux/actions/actionMenuSlice";
import {
    setLoadingAction,
    setMessageDeleteID,
    setMessageEditID,
} from "@/redux/actions/inboxSlice";

export default function InboxDetailHeader({ name, participants }) {
    const dispatch = useDispatch();

    return (
        <div
            id="chat-header"
            className="h-full flex flex-row gap-x-3 items-center border-b px-8 "
        >
            <div className="w-[10%] text-start">
                <Button
                    className="bg-transparent w-auto px-0"
                    onClick={() => {
                        dispatch(toggleDetail({ key: "inbox", id: null }));
                        dispatch(setMessageEditID(null));
                        dispatch(setMessageDeleteID(null));
                        dispatch(setLoadingAction(false));
                    }}
                >
                    <Icon src={backIcon} className={`h-[32px] w-[32px]`} />
                </Button>
            </div>
            <div className="w-[82%]">
                <p
                    className="text-sm font-bold text-primary uppercase line-clamp-1 leading-none"
                    title={name}
                >
                    {name}
                </p>
                {participants && (
                    <span className="text-xs">
                        {participants} Partisipant{participants > 1 && "s"}
                    </span>
                )}
            </div>
            <div className="w-[8%] text-end">
                <Button
                    className="bg-transparent mx-auto w-auto px-0"
                    onClick={() => {
                        dispatch(
                            toggleFloatingMenu({ key: "inbox", value: false })
                        );
                        dispatch(toggleDetail({ key: "inbox", id: null }));
                    }}
                >
                    <Icon src={closeIcon} className={`h-[18px] w-[18px]`} />
                </Button>
            </div>
        </div>
    );
}
