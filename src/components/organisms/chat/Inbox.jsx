import React from "react";
import Icon from "@/components/atoms/Icon";
import Search from "@/components/molecules/Search";
import searchIcon from "@/assets/icons/Group 1610.svg";
import InboxItem from "./components/InboxItem";
import Loading from "@/components/molecules/Loading";

export default function Inbox({
    control,
    state,
    onToggleClick,
    data,
    isLoading,
    error,
}) {
    return (
        <div className="flex flex-col py-6 w-full h-full">
            <div className="px-8 w-full">
                <div
                    id="chat-search"
                    className="border rounded-md border-gray-400 flex items-center px-5 "
                >
                    <Search
                        control={control}
                        className="bg-transparent h-8 ps-5 pe-3 text-primary-dark placeholder:ps-5 placeholder:text-primary-dark placeholder:text-sm focus:border-1"
                        placeholder="Search"
                    />
                    <Icon src={searchIcon} className="h-2 w-2" />
                </div>
            </div>

            <div
                className={`overflow-auto ${
                    isLoading && "flex items-center justify-center h-full"
                }`}
            >
                {isLoading ? (
                    <Loading className={"text-primary-dark"}>
                        Loading Chats
                    </Loading>
                ) : error ? (
                    <div>Error loading inbox: {error.message}</div>
                ) : (
                    data &&
                    data.map((item) => (
                        <div
                            key={item.id}
                            id="chat-wrapper"
                            className="w-full border-b pt-[22px] pb-[22px] px-8 cursor-pointer hover:bg-primary-light transform hover:transition-all"
                            onClick={() =>
                                onToggleClick(
                                    "openInboxDetail",
                                    !state.openInboxDetail
                                )
                            }
                        >
                            <InboxItem
                                name={item.name}
                                date={item.date}
                                message={item.message}
                                isGroup={item.isGroup}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
