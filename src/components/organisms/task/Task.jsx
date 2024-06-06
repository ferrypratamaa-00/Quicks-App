import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ListItem from "./components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getTaskCategories, getTasks, getTasksByCategory } from "@/api/api";
import Loading from "@/components/molecules/Loading";

const useTasksByCategoryData = (id, openTask) => {
    const { isLoading, error, data, refetch } = useQuery(
        ["tasksByCategories"],
        () => getTasksByCategory(id),
        {
            staleTime: Infinity,
            enabled: openTask && id !== null,
        }
    );

    useEffect(() => {
        if (openTask) {
            refetch();
        }
    }, [openTask]);

    return { isLoading, error, data, refetch };
};

const useTasksData = (id, openTask) => {
    const { isLoading, error, data, refetch } = useQuery(
        ["tasks"],
        () => getTasks(id),
        {
            staleTime: Infinity,
            enabled: openTask && id !== null,
        }
    );

    useEffect(() => {
        if (openTask) {
            refetch();
        }
    }, [openTask]);

    return { isLoading, error, data, refetch };
};

const useTasksCategoriesData = (openTask) => {
    const { isLoading, error, data, refetch } = useQuery(
        ["categories"],
        getTaskCategories,
        {
            staleTime: Infinity,
            enabled: openTask,
        }
    );

    useEffect(() => {
        if (openTask) {
            refetch();
        }
    }, [openTask]);

    return { isLoading, error, data, refetch };
};

const tasksProcess = (tasks, newItem) => {
    return newItem.length > 0 ? tasks.concat(newItem) : tasks;
};

export default function Task() {
    const dispatch = useDispatch();
    const task = useSelector((state) => state.actionMenu.floating.task);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryChange = (event) => {
        setSelectedCategory(event);
    };
    useEffect(() => {
        console.log(selectedCategory);
    }, [selectedCategory]);
    const tasks = useTasksData("1", task);
    const tasksCategories = useTasksCategoriesData(task);
    const filterTask = useTasksByCategoryData(selectedCategory, task);

    const [newItems, setNewItems] = useState([]);

    const handleNewTask = () => {
        const newTask = {
            taskId: Math.floor(Math.random() * 1000),
            name: "",
            date: "",
            description: "",
        };
        setNewItems([...newItems, newTask]);
    };

    const taskData =
        selectedCategory !== null
            ? filterTask.isLoading
                ? []
                : filterTask.data
            : tasksProcess(tasks.data || [], newItems);

    return (
        <div className="flex flex-col py-6 w-full h-full">
            <div className="px-8 w-full" key={1}>
                <div
                    id="chat-search"
                    className="flex items-center justify-between"
                >
                    <Select onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-[120px] ms-12 h-full text-primary-dark text-sm">
                            <SelectValue placeholder="My Task" />
                        </SelectTrigger>
                        <SelectContent className="w-[200px] relative -left-12 text-sm">
                            {tasksCategories.isLoading ? (
                                <SelectItem key={1} value={null}>
                                    Loading
                                </SelectItem>
                            ) : (
                                <>
                                    {tasksCategories.data.map((item) => {
                                        return (
                                            <SelectItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        );
                                    })}
                                </>
                            )}
                        </SelectContent>
                    </Select>
                    <Button
                        className="bg-primary h-full hover:bg-blue-600"
                        onClick={handleNewTask}
                    >
                        New Task
                    </Button>
                </div>
            </div>
            <div
                key={2}
                className={`overflow-auto ${
                    (tasks.isLoading || !taskData) &&
                    "flex items-center justify-center h-full"
                }`}
            >
                {tasks.isLoading || !taskData ? (
                    <Loading className={"text-primary-dark h-6 w-6"}>
                        Loading Chats
                    </Loading>
                ) : tasks.error ? (
                    <div>Error loading inbox: {tasks.error.message}</div>
                ) : (
                    taskData &&
                    taskData.map((item) => (
                        <div
                            key={item.id}
                            id="chat-wrapper"
                            className="w-full border-b pt-[22px] pb-[22px] px-8 cursor-pointer  transform hover:transition-all"
                        >
                            <ListItem data={item} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
