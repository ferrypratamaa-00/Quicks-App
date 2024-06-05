import React from "react";
import { useController } from "react-hook-form";

function Search({ control, children = "", className, ...props }) {
    const {
        field: { onChange, onBlur, value, ref },
    } = useController({
        name: "keyword",
        control,
    });

    return (
        <div className="flex items-center w-full">
            {children}
            <input
                type="search"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                className={`w-full placeholder:text-gray-200 dark:placeholder:text-gray-200 focus:ring-0 focus:outline-none ${className}`}
                {...props}
            />
        </div>
    );
}

export default Search;
