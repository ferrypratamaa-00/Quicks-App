import React from "react";
import Menu1 from "@/components/pages/Menu1";
import Menu2 from "@/components/pages/Menu2";
import ErrorPage from "@/components/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu1 />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/menu-2",
        element: <Menu2 />,
    },
]);

export default router;
