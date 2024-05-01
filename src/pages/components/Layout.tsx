import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutsProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutsProps> = ({ children }) => {
    return (
        <>
            <div className="h-screen flex flex-col px-36">
                <Navbar />
                <div className="flex-grow">{children}</div>
            </div>
            {/* <Footer /> */}
        </>
    );
};
