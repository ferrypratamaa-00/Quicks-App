"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDebounce } from "use-debounce";
import Search from "@/components/molecules/Search";
import Icon from "@/components/atoms/Icon";
import searchIcon from "@/assets/icons/Group 1609.svg";

const formSchema = z.object({
    keyword: z
        .string()
        .min(1, { message: "Keyword must be at least 2 characters." })
        .max(50),
});

export default function Navbar({ toggleSidebar }) {
    const keywordHandle = (search) => {
        try {
            if (search.keyword.length > 2) {
                console.log(search);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { control, watch } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: "",
        },
    });

    const keyword = watch("keyword");
    const [debouncedKeyword] = useDebounce(keyword, 300);

    useEffect(() => {
        if (debouncedKeyword) {
            keywordHandle({ keyword: debouncedKeyword });
        }
    }, [debouncedKeyword]);

    return (
        <div className="text-white flex gap-x-2 md:gap-x-0 items-center justify-between ps-2 pe-0 py-0 md:px-0">
            <button className="sm:hidden" onClick={toggleSidebar}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
            <div className="flex flex-row items-center w-full bg-primary-grey hover:bg-[#666666] transform transition-all px-4">
                <Search
                    control={control}
                    className={`bg-transparent h-10 px-3 py-2 text-white`}
                >
                    <Icon src={searchIcon} />
                </Search>
            </div>
        </div>
    );
}
