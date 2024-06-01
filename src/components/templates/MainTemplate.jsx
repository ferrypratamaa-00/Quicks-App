import React, { useState } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import Navbar from "../molecules/navbar/Navbar";

export default function MainTemplate({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    return (
        <div className="h-screen bg-primary-dark">
            <div className="flex flex-col sm:flex-row">
                <Sidebar isOpen={openSidebar} toggleSidebar={toggleSidebar} />
                <div className="flex flex-col w-full">
                    <Navbar
                        isOpen={openSidebar}
                        toggleSidebar={toggleSidebar}
                    />
                    <div className="p-4">{children}</div>
                </div>
            </div>
        </div>
    );
}
