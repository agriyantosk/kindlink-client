import React from "react";
import Navbar from "./Navbar";

type LayoutsProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutsProps> = ({ children }) => {
    return (
        <>
            <div className="h-screen">
                <Navbar />
                <div className="h-full px-36 pt-10">{children}</div>
            </div>
        </>
    );
};
