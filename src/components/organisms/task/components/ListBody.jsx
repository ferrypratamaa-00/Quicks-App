import React, { useRef, useState, useEffect } from "react";
import TimeIcon from "@/assets/icons/Group 1324.svg";
import TimeIconActive from "@/assets/icons/Group 1323.svg";
import PencilIcon from "@/assets/icons/Group 1715.svg";
import PencilIconActive from "@/assets/icons/Group 1714.svg";
import Icon from "@/components/atoms/Icon";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const icons = {
    time: {
        default: TimeIcon,
        active: TimeIconActive,
    },
    pencil: {
        default: PencilIcon,
        active: PencilIconActive,
    },
};

export default function ListBody({ className, dated, description }) {
    const [date, setDate] = useState(dated);
    const [isEditing, setIsEditing] = useState(false);
    const descriptionRef = useRef(null);
    const [originalDescription, setOriginalDescription] = useState("");

    useEffect(() => {
        if (description === "") {
            setOriginalDescription("No description");
        } else {
            setOriginalDescription(description);
        }
    }, [description]);

    const handleDescriptionEdit = () => {
        setIsEditing(true);
        if (descriptionRef.current.innerHTML === "No description") {
            setOriginalDescription("");
        }
    };

    const handleDescriptionBlur = () => {
        setIsEditing(false);
        if (descriptionRef.current.innerHTML.trim() === "") {
            setOriginalDescription("No description");
        } else {
            setOriginalDescription(descriptionRef.current.innerHTML);
        }
    };

    return (
        <div className={className}>
            <div className={`flex flex-row gap-x-2 items-center mb-2`}>
                <div className="w-[9%] ">
                    <Icon
                        src={
                            date !== "" ? icons.time.active : icons.time.default
                        }
                        className={"h-[14px] w-[14px] float-end"}
                    />
                </div>
                <div className="w-[91%]">
                    <Popover>
                        <PopoverContent className="w-auto p-0 ms-[250px]">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                        <div className="w-[120px] flex flex-row border px-3 rounded-md bg-white">
                            <input
                                type="text"
                                className="w-full text-xs text-primary-dark border-none focus:border-none focus:outline-none placeholder:text-primary-dark "
                                pattern="\d{2}/\d{2}/\d{4}"
                                placeholder="Set Date"
                                value={date ? format(date, "dd/MM/yyyy") : ""}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "rounded-none text-end font-normal border-none hover:bg-transparent p-0 text-primary-dark",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                        </div>
                    </Popover>
                </div>
            </div>

            <div className="flex flex-row gap-x-2 items-center">
                <div className="w-[9%]">
                    <Icon
                        src={
                            description !== "" && !isEditing
                                ? icons.pencil.active
                                : icons.pencil.default
                        }
                        className={"h-[14px] w-[14px] float-end"}
                        onClick={handleDescriptionEdit}
                    />
                </div>
                <div
                    className={`w-[84%] p-1 ps-0 ${
                        isEditing && "h-auto border outline-none rounded"
                    }`}
                >
                    <div
                        ref={descriptionRef}
                        className={`text-xs text-primary-dark break-words ${
                            isEditing &&
                            "ps-1 border-none outline-none cursor-text"
                        }`}
                        onClick={handleDescriptionEdit}
                        dangerouslySetInnerHTML={{
                            __html: originalDescription,
                        }}
                        contentEditable={isEditing}
                        onBlur={handleDescriptionBlur}
                    />
                </div>
            </div>
        </div>
    );
}
