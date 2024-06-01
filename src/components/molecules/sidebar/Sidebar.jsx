import { Button } from "@/components/ui/button";
import React from "react";

export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div
            className={`bg-primary-dark border-e border-gray-100 text-white h-screen w-72 md:w-96 flex-col px-10 py-5 ${
                isOpen ? "block" : "hidden"
            } sm:block`}
        >
            <Button
                color="transparent"
                className={`sm:hidden fixed top-2 left-72`}
                onClick={toggleSidebar}
            >
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
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </Button>
        </div>
    );
}
