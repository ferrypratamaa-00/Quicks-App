import { useEffect } from "react";

const useScrollToBottom = (chatListRef) => {
    useEffect(() => {
        const scrollToBottom = () => {
            const section = chatListRef.current;
            section.scrollTo({
                top: section.scrollHeight + 50,
                behavior: "smooth",
            });
        };

        scrollToBottom();
    }, [chatListRef]);
};

export default useScrollToBottom;
