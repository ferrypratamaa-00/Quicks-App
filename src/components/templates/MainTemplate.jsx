import React, { useState } from "react";
import FloatingMenu from "@/components/organisms/FloatingMenu/FloatingMenu";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import Navbar from "@/components/organisms/navbar/Navbar";

export default function MainTemplate({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    return (
        <>
            <FloatingMenu />
            <div className="h-screen bg-primary-dark ">
                <div className="flex flex-row">
                    <Sidebar
                        isOpen={openSidebar}
                        toggleSidebar={toggleSidebar}
                        className={`${openSidebar && `absolute z-10`}`}
                    />
                    <div className="flex flex-col w-full">
                        <Navbar
                            isOpen={openSidebar}
                            toggleSidebar={toggleSidebar}
                        />
                        <div
                            className={`p-4 text-white ${
                                openSidebar && "mt-10"
                            }`}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
