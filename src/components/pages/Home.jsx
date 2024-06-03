import React, { useEffect, useState } from "react";
import MainTemplate from "../templates/MainTemplate";
import FloatingAction from "../molecules/FloatingAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";
import Inbox from "../organisms/chat/Inbox";
import { useSpring, animated } from "@react-spring/web";
import InboxDetail from "../organisms/chat/InboxDetail";
import { useQuery } from "react-query";
import { getInboxs } from "@/api/api";

const formSchema = z.object({
    keyword: z
        .string()
        .min(2, { message: "Keyword must be at least 2 characters." })
        .max(50),
});

const useInboxData = (openInbox) => {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["inboxs"],
        queryFn: getInboxs,
        staleTime: Infinity,
        enabled: openInbox,
    });

    useEffect(() => {
        if (openInbox) {
            refetch(); // refetch harus dipanggil sebagai fungsi
        }
    }, [openInbox, refetch]);
    return { isLoading, error, data };
};

const useKeywordSearch = () => {
    const { control, watch } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: "",
        },
    });

    const keyword = watch("keyword");

    return { keyword, control };
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

const useModalAnimation = (openInbox) => {
    const modalAnimation = useSpring({
        opacity: openInbox ? 1 : 0,
        transform: openInbox ? "scale(1)" : "scale(0.9)",
        config: { tension: 300, friction: 20 },
    });

    return modalAnimation;
};

export default function Home() {
    const [floatingState, setFloatingState] = useState({
        openAction: false,
        openTask: false,
        openInbox: false,
        openInboxDetail: false,
        openTaskDetail: false,
    });

    const handleToggleClick = (key, value) => {
        setFloatingState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const search = useKeywordSearch();

    const [debouncedKeyword] = useDebounce(search.keyword, 1000);

    const inboxs = useInboxData(floatingState.openInbox);

    const filteredData = useFilteredData(inboxs.data || [], debouncedKeyword);

    const modalAnimation = useModalAnimation(floatingState.openInbox);

    const inboxsData = filteredData;

    return (
        <MainTemplate>
            {floatingState.openInbox && (
                <animated.div
                    style={modalAnimation}
                    id="chat-box"
                    className="fixed bottom-20 right-5 bg-white border rounded-md w-full md:w-96 h-96"
                >
                    {floatingState.openInboxDetail ? (
                        <InboxDetail
                            state={floatingState}
                            onToggleClick={handleToggleClick}
                        />
                    ) : (
                        <Inbox
                            isLoading={inboxs.isLoading}
                            error={inboxs.error}
                            data={inboxsData}
                            control={search.control}
                            state={floatingState}
                            onToggleClick={handleToggleClick}
                        />
                    )}
                </animated.div>
            )}
            {floatingState.openTask && (
                <animated.div
                    style={modalAnimation}
                    id="chat-box"
                    className="fixed bottom-20 right-5 bg-white border rounded-md w-full md:w-96 h-96"
                >
                    {/* Content for tasks goes here */}
                </animated.div>
            )}
            <FloatingAction
                state={floatingState}
                onToggleClick={handleToggleClick}
            />
        </MainTemplate>
    );
}
