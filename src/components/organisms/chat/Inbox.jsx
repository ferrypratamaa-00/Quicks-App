import React from "react";
import Icon from "@/components/atoms/Icon";
import Search from "@/components/molecules/Search";
import searchIcon from "@/assets/icons/Group 1610.svg";
import InboxItem from "./components/InboxItem";

export default function Inbox({ control, state, onToggleClick }) {
    return (
        <div className="flex flex-col py-6 w-full h-full">
            <div className="px-8 w-full">
                <div
                    id="chat-search"
                    className="border rounded-md border-gray-400 flex items-center px-5 bg-red-50"
                >
                    <Search
                        control={control}
                        className="bg-transparent h-8 ps-5 pe-3 text-primary-dark placeholder:ps-5 placeholder:text-primary-dark placeholder:text-sm focus:border-1"
                        placeholder="Search"
                    />
                    <Icon src={searchIcon} className="h-2 w-2" />
                </div>
            </div>
            <div className="overflow-auto">
                <div
                    key={1}
                    id="chat-wrapper"
                    className="w-full pt-[22px] pb-[22px] px-8 cursor-pointer hover:bg-primary-light transform hover:transition-all"
                    onClick={() =>
                        onToggleClick("openInboxDetail", !state.openInboxDetail)
                    }
                >
                    <InboxItem
                        name="Lorem ipsum dolor sit amet consectetur adipisicing elit adipisicing elit."
                        date="01/06/2021 12:09"
                        message="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        isGroup={true}
                    />
                </div>
                <div
                    id="chat-wrapper"
                    className="flex flex-row gap-x-8 pt-[22px] pb-[22px] px-8 cursor-pointer  hover:bg-primary-light  transform hover:transition-all"
                >
                    <InboxItem
                        name="Lorem ipsum dolor sit amet consectetur."
                        date="01/06/2021 12:09"
                        message="Lorem ipsum dolor sit amet."
                        isGroup={false}
                    />
                </div>
                <div
                    id="chat-wrapper"
                    className="flex flex-row gap-x-8 pt-[22px] pb-[22px] px-8 cursor-pointer  hover:bg-primary-light  transform hover:transition-all"
                >
                    <InboxItem
                        name="Lorem ipsum dolor sit amet consectetur."
                        date="01/06/2021 12:09"
                        message="Lorem ipsum dolor sit amet."
                        isGroup={false}
                    />
                </div>
                <div
                    id="chat-wrapper"
                    className="flex flex-row gap-x-8 pt-[22px] pb-[22px] px-8 cursor-pointer  hover:bg-primary-light  transform hover:transition-all"
                >
                    <InboxItem
                        name="Lorem ipsum dolor sit amet consectetur."
                        date="01/06/2021 12:09"
                        message="Lorem ipsum dolor sit amet."
                        isGroup={false}
                    />
                </div>
            </div>
        </div>
    );
}
