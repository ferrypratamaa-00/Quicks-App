import React from "react";
import Icon from "@/components/atoms/Icon";
import personIcon from "@/assets/icons/Group 1607.svg";
import personSecondIcon from "@/assets/icons/Group 1608.svg";
import { getInitials } from "@/utils/stringUtils";

const InboxIcons = ({ isGroup, name }) => {
    const initials = getInitials(name);
    return (
        <div className="flex items-center justify-center w-full h-full">
            {isGroup ? (
                <div className="relative w-full">
                    <div className="rounded-full h-8 w-8 flex items-center bg-primary-light">
                        <Icon src={personSecondIcon} className="mx-auto" />
                    </div>
                    <div className="absolute bottom-0 left-4 rounded-full h-8 w-8 flex items-center bg-primary">
                        <Icon src={personSecondIcon} className="mx-auto" />
                    </div>
                </div>
            ) : (
                <div className="rounded-full h-8 w-8 flex items-center bg-primary">
                    <span className="uppercase text-sm font-semibold mx-auto text-white">
                        {initials}
                    </span>
                </div>
            )}
        </div>
    );
};

export default InboxIcons;
