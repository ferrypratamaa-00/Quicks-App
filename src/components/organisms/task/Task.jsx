import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ListItem from "./components/ListItem";
import { useDispatch } from "react-redux";
import { toggleDetail } from "@/redux/actions/actionMenuSlice";

export default function Task() {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col py-6 w-full h-full">
            <div className="px-8 w-full h-full">
                <div
                    key={1}
                    id="task-action"
                    className="flex flex-row items-center justify-between  border-gray-400 ps-6 h-9"
                >
                    <Select>
                        <SelectTrigger className="w-[180px] h-full text-primary-dark">
                            <SelectValue placeholder="My Task" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="bg-primary h-full hover:bg-blue-600">
                        New Task
                    </Button>
                </div>
                <div id="task-list" className={`overflow-auto h-[358px]`}>
                    <div
                        key={1}
                        className="w-full border-b py-[22px] cursor-pointer  transform hover:transition-all"
                    >
                        <ListItem />
                    </div>
                    <div
                        key={2}
                        className="w-full border-b py-[22px] cursor-pointer  transform hover:transition-all"
                    >
                        <ListItem isCompleted={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}
