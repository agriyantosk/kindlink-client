import React, { useState, createContext, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CandidateDetailModal from "./CandidateDetailModal";

// Step 1: Create a context
const ModalContext = createContext<any>(null);

type LayoutsProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutsProps> = ({ children }) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        // Step 2: Provide the context value
        <ModalContext.Provider value={{ setShowModal }}>
            <>
                {showModal && (
                    <div className="absolute flex justify-center items-center h-screen w-screen bg-black bg-opacity-20">
                        <CandidateDetailModal />
                    </div>
                )}
                <div className="h-screen flex flex-col px-36">
                    <Navbar />
                    <div className="flex-grow">{children}</div>
                </div>
                {/* <Footer /> */}
            </>
        </ModalContext.Provider>
    );
};

// Custom hook to consume the context
export const useModal = () => useContext(ModalContext);
