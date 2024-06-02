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

const formSchema = z.object({
    keyword: z
        .string()
        .min(1, { message: "Keyword must be at least 2 characters." })
        .max(50),
});

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

    const keywordHandle = (search) => {
        try {
            if (search.keyword.length > 2) {
                console.log(search);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { control, watch } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: "",
        },
    });

    const keyword = watch("keyword");
    const [debouncedKeyword] = useDebounce(keyword, 300);

    useEffect(() => {
        if (debouncedKeyword) {
            keywordHandle({ keyword: debouncedKeyword });
        }
    }, [debouncedKeyword]);

    const modalAnimation = useSpring({
        opacity: floatingState.openInbox ? 1 : 0,
        transform: floatingState.openInbox ? "scale(1)" : "scale(0.9)",
        config: { tension: 300, friction: 20 },
    });

    useEffect(() => {
        console.table(floatingState);
    }, [floatingState]);
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
                            control={control}
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
                    {/* <Inbox control={control} /> */}
                </animated.div>
            )}
            <FloatingAction
                state={floatingState}
                onToggleClick={handleToggleClick}
            />
        </MainTemplate>
    );
}
