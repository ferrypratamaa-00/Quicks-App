import React, { useState } from "react";
import ListHeader from "./ListHeader";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import ListBody from "./ListBody";

export default function ListItem(props) {
    const { isCompleted } = props;
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

    console.log(status());
    return (
        <div className="h-full overflow">
            <Collapsible
                open={status()}
                onOpenChange={setIsOpen}
                className="flex flex-col"
            >
                <ListHeader
                    isCompleted={isCompletedValue}
                    isOpen={status()}
                    handleOpen={handleOpen}
                />
                <CollapsibleContent className="space-y-2">
                    <ListBody />
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
