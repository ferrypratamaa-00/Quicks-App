import React, { useState } from "react";
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

export default function ListBody() {
    const [date, setDate] = useState("");

    return (
        <>
            <div className="flex flex-row gap-x-2 items-center mb-3">
                <div className="w-[9%]">
                    <Icon
                        src={icons.time.default}
                        className={"h-[14px] w-[14px] float-end"}
                    />
                </div>
                <div className="w-[91%]">
                    <Popover>
                        <PopoverContent className="w-auto p-0 ms-[350px]">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                        <div className="w-[120px] flex flex-row border rounded-md ps-3 pe-1">
                            <input
                                type="text"
                                className="w-full text-xs text-primary-dark border-none focus:border-none focus:outline-none placeholder:text-primary-dark"
                                pattern="\d{2}/\d{2}/\d{4}"
                                placeholder="Set Date"
                                value={date ? format(date, "dd/MM/yyyy") : ""}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "text-end font-normal border-none hover:bg-transparent p-0 text-primary-dark",
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
                        src={PencilIcon}
                        className={"h-[14px] w-[14px] float-end"}
                    />
                </div>
                <div className="w-[84%]">
                    <p className="text-xs text-primary-dark">No Description</p>
                </div>
            </div>
        </>
    );
}
