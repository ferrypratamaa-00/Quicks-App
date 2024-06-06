import React, { useState } from "react";
import ListHeader from "./ListHeader";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import ListBody from "./ListBody";

export default function ListItem({ data }) {
    const {
        id,
        userId,
        taskCategoriesId,
        name,
        date,
        description,
        isCompleted,
        createdAt,
        updatedAt,
    } = data;

    const isCompletedValue = isCompleted ? true : false;
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const status = () => {
        if (isCompleted) {
            if (isOpen) {
                return true;
            }
            return false;
        } else {
            if (isOpen) {
                return false;
            }
            return true;
        }
    };

    return (
        <Collapsible
            open={status()}
            onOpenChange={setIsOpen}
            className="flex flex-col"
        >
            <ListHeader
                id={id}
                name={name}
                date={date}
                isCompleted={isCompletedValue}
                isOpen={status()}
                handleOpen={handleOpen}
            />
            <CollapsibleContent className="space-y-2">
                <ListBody
                    dated={date}
                    className={"cursor-pointer"}
                    description={description}
                />
            </CollapsibleContent>
        </Collapsible>
    );
}
