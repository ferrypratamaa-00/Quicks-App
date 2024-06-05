import React from "react";
import Icon from "@/components/atoms/Icon";
import Search from "@/components/molecules/Search";
import searchIcon from "@/assets/icons/Group 1610.svg";
import InboxItem from "./components/InboxItem";
import Loading from "@/components/molecules/Loading";
import { useDispatch } from "react-redux";
import { toggleDetail } from "@/redux/actions/actionMenuSlice";

export default function Inbox({ control, data, isLoading, error }) {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col py-6 w-full h-full">
            <div className="px-8 w-full">
                <div
                    key={1}
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
                key={2}
                className={`overflow-auto ${
                    (isLoading || !data) &&
                    "flex items-center justify-center h-full"
                }`}
            >
                {isLoading || !data ? (
                    <Loading className={"text-primary-dark h-6 w-6"}>
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
                                dispatch(
                                    toggleDetail({ key: "inbox", id: item.id })
                                )
                            }
                        >
                            <InboxItem data={item} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
