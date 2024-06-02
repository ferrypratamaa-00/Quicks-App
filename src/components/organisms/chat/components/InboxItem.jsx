import React from "react";
import InboxIcons from "./InboxIcons";

const InboxItem = ({ isGroup, name, date, message }) => (
    <div className="flex w-full items-center">
        <div className="w-[18%]">
            <InboxIcons isGroup={isGroup} name={name} />
        </div>
        <div className="w-[76%]">
            <div className="columns-10 flex flex-col flex-grow">
                <p className="flex flex-row text-primary text-xs items-center">
                    <span className="font-bold line-clamp-2">{name}</span>
                    <span className="text-nowrap ml-auto text-[10px] text-primary-grey">
                        {date}
                    </span>
                </p>
                <p className="text-primary-dark font-bold text-xs mt-1 line-clamp-1">
                    Nama
                </p>
                <p className="text-primary-dark text-[11px] line-clamp-1">
                    {message}
                </p>
            </div>
        </div>
        <div className="relative w-[5%]">
            <p className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-indicator-red"></p>
        </div>
    </div>
);

export default InboxItem;
