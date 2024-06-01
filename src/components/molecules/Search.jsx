import React from "react";
import { useController } from "react-hook-form";
import Icon from "../atoms/Icon";
import searchIcon from "../../assets/icons/Group 1609.svg";

function Search({ control }) {
    const {
        field: { onChange, onBlur, value, ref },
    } = useController({
        name: "keyword",
        control,
    });

    return (
        <div className="flex items-center w-full">
            <Icon src={searchIcon} />
            <input
                type="search"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                className="w-full bg-transparent h-10 px-3 py-2 text-white placeholder:text-gray-200 dark:placeholder:text-gray-200 border-0 focus:ring-0 focus:outline-none focus:border-none"
            />
        </div>
    );
}

export default Search;
