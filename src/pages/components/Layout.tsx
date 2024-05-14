import React, { useState, createContext, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CandidateDetailModal from "./CandidateDetailModal";

// Step 1: Create a context
const ModalContext = createContext<any>(null);
const CandidateDataContext = createContext<any>(null);
const FilterContext = createContext<any>(null);

type LayoutsProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutsProps> = ({ children }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [candidateDetail, setCandidateDetail] = useState<any>(null);
    const [filterOption, setFilterOption] = useState<string>("progress");

    return (
        <CandidateDataContext.Provider
            value={{ candidateDetail, setCandidateDetail }}
        >
            <FilterContext.Provider value={{ filterOption, setFilterOption }}>
                <ModalContext.Provider value={{ setShowModal }}>
                    <>
                        {showModal && (
                            <div className="absolute flex justify-center items-center h-screen w-screen bg-black bg-opacity-20">
                                <CandidateDetailModal />
                            </div>
                        )}
                        <div className="h-screen flex flex-col px-48">
                            <Navbar />
                            <div className="flex-grow my-10">{children}</div>
                        </div>
                        {/* <Footer /> */}
                    </>
                </ModalContext.Provider>
            </FilterContext.Provider>
        </CandidateDataContext.Provider>
    );
};

// Custom hook to consume the context
export const useModal = () => useContext(ModalContext);
export const useCandidateDetail = () => useContext(CandidateDataContext);
export const useFilterContext = () => useContext(FilterContext);
