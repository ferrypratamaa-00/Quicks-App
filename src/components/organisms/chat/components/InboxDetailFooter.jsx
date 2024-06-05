import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

const formSchema = z.object({
    message: z
        .string()
        .min(1, { message: "Keyword must be at least 1 character." }),
});

export default function InboxDetailFooter({
    handleAdd,
    handleEdit,
    isLoading,
    messageEdit = "",
}) {
    const inboxAction = useSelector((state) => state.inbox);
    const { register, handleSubmit, watch, reset, setValue } = useForm({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (messageEdit !== "") {
            setValue("message", messageEdit);
        }
    }, [messageEdit, setValue]);

    const message = watch("message");
    const onSubmit = (data) => {
        if (inboxAction.messageEditID) {
            handleEdit(data);
        } else {
            handleAdd(data);
        }
        reset();
    };

    return (
        <div className="flex gap-x-3 items-center h-full px-8 border-t border-gray-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full gap-x-3"
            >
                <div className="flex-grow">
                    <Input
                        type="text"
                        placeholder="Type a new message..."
                        className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-transparent w-full"
                        autoComplete="off"
                        {...register("message")}
                    />
                </div>
                <Button
                    type="submit"
                    className="bg-primary hover:bg-primary"
                    disabled={
                        !message || message.trim().length === 0 || isLoading
                    }
                >
                    {isLoading ? "..." : "Send"}
                </Button>
            </form>
        </div>
    );
}
