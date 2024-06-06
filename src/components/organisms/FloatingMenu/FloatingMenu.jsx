"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";
import { useSpring, animated } from "@react-spring/web";
import { useQuery } from "react-query";
import InboxDetail from "../chat/InboxDetail";
import Inbox from "../chat/Inbox";
import FloatingAction from "@/components/molecules/FloatingAction";
import { getInbox, getInboxs } from "@/api/api";
import { useSelector } from "react-redux";
import Task from "../task/Task";

const formSchema = z.object({
    keyword: z
        .string()
        .min(2, { message: "Keyword must be at least 2 characters." })
        .max(50),
});

const useInboxData = (inboxID) => {
    const { isLoading, error, data, refetch } = useQuery(
        ["inbox", inboxID],
        () => getInbox(inboxID),
        { staleTime: Infinity, enabled: inboxID !== null }
    );

    return { isLoading, error, data, refetch };
};

const useInboxsData = (openInbox) => {
    const { isLoading, error, data, refetch } = useQuery(
        ["inboxs"],
        getInboxs,
        { staleTime: Infinity, enabled: openInbox }
    );

    useEffect(() => {
        if (openInbox) {
            refetch();
        }
    }, [openInbox, refetch]);

    return { isLoading, error, data, refetch };
};

const useKeywordSearch = () => {
    const { control, watch } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { keyword: "" },
    });

    const keyword = watch("keyword");
    const [debouncedKeyword] = useDebounce(keyword, 1000);

    return { debouncedKeyword, control };
};

const useFilteredData = (inboxs, debouncedKeyword) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (debouncedKeyword.length > 2) {
            const filtered = inboxs.filter((item) =>
                item.name.toLowerCase().includes(debouncedKeyword.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(inboxs);
        }
    }, [debouncedKeyword, inboxs]);

    return filteredData;
};

const useModalAnimation = (open) => {
    console.log(open);
    const modalAnimation = useSpring({
        opacity: open ? 1 : 0,
        transform: open ? "scale(1)" : "scale(0.9)",
        config: { tension: 300, friction: 20 },
    });

    return modalAnimation;
};

export default function FloatingMenu() {
    const floating = useSelector((state) => state.actionMenu.floating);
    const detail = useSelector((state) => state.actionMenu.detail);

    const inboxProcess = (id) => {
        return id ? inbox.data : null;
    };

    const inbox = useInboxData(detail.inbox);
    const inboxData = inboxProcess(detail.inbox);

    const search = useKeywordSearch();
    const inboxs = useInboxsData(floating.inbox);
    const filteredData = useFilteredData(inboxs.data, search.debouncedKeyword);
    const modalAnimation = useModalAnimation(floating.inbox || floating.task);

    const inboxsProcess = (debouncedKeyword) => {
        return debouncedKeyword ? filteredData : inboxs.data;
    };
    const inboxsData = inboxsProcess(search.debouncedKeyword);

    return (
        <>
            <animated.div
                style={modalAnimation}
                id="chat-box"
                className="fixed bottom-20 right-5 bg-white border rounded-md w-full md:max-w-lg h-[448px]"
            >
                {floating.inbox && (
                    <>
                        {detail.inbox ? (
                            <InboxDetail
                                data={inboxData}
                                isLoading={inbox.isLoading}
                            />
                        ) : (
                            <Inbox
                                isLoading={inboxs.isLoading}
                                error={inboxs.error}
                                data={inboxsData}
                                control={search.control}
                            />
                        )}
                    </>
                )}
                {floating.task && <Task />}
            </animated.div>
            <FloatingAction />
        </>
    );
}
