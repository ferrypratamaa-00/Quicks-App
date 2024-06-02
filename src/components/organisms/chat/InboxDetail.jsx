import React from "react";
import backIcon from "@/assets/icons/Group 1921.svg";
import closeIcon from "@/assets/icons/icon/navigation/close_24px_dark.svg";
import Icon from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";

export default function InboxDetail({ state, onToggleClick }) {
    return (
        <div className="flex flex-col">
            <div
                id="chat-header"
                className="flex flex-row gap-x-3 items-center border-b py-3 px-3"
            >
                <div className="w-8">
                    <Button
                        className="bg-transparent w-auto px-0"
                        onClick={() =>
                            onToggleClick(
                                "openInboxDetail",
                                !state.openInboxDetail
                            )
                        }
                    >
                        <Icon src={backIcon} className={`h-6 w-6`} />
                    </Button>
                </div>
                <div className="w-full">
                    <p
                        className="text-xs font-bold text-primary uppercase line-clamp-1"
                        title={`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, dolores?`}
                    >
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Vel, dolores?
                    </p>
                    <span className="text-[11px]">3 partisipant</span>
                </div>
                <div className="w-8">
                    <Button className="bg-transparent w-auto px-0">
                        <Icon src={closeIcon} className={`h-3 w-3`} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
