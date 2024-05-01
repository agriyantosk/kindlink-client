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
                {children}
            </div>
        </>
    );
};
