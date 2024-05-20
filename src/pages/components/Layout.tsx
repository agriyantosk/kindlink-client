import React, { useState, createContext, useContext, useEffect } from "react";
import Footer from "./Footer";
import CandidateDetailModal from "./CandidateDetailModal";
import Navbar from "./navbar";

const ModalContext = createContext<any>(null);
const CandidateDataContext = createContext<any>(null);
const FilterContext = createContext<any>(null);
const LoadingContext = createContext<any>(false);
const LoadingMessageContext = createContext<any>("");

type LayoutsProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutsProps> = ({ children }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [candidateDetail, setCandidateDetail] = useState<any>(null);
    const [filterOption, setFilterOption] = useState<string>("progress");
    const [isLoading, setIsLoading] = useState<boolean>();
    const [loadingMessage, setLoadingMessage] = useState<string>();

    return (
        <CandidateDataContext.Provider
            value={{ candidateDetail, setCandidateDetail }}
        >
            <FilterContext.Provider value={{ filterOption, setFilterOption }}>
                <ModalContext.Provider value={{ setShowModal }}>
                    <LoadingContext.Provider value={{ setIsLoading }}>
                        <LoadingMessageContext.Provider
                            value={{ setLoadingMessage }}
                        >
                            <>
                                {showModal && (
                                    <div className="absolute flex justify-center items-center h-screen w-screen bg-black bg-opacity-20">
                                        <CandidateDetailModal />
                                    </div>
                                )}
                                <div className="h-screen flex flex-col px-48">
                                    <Navbar />
                                    <div className="flex-grow">{children}</div>
                                </div>
                                {/* <Footer /> */}
                            </>
                        </LoadingMessageContext.Provider>
                    </LoadingContext.Provider>
                </ModalContext.Provider>
            </FilterContext.Provider>
        </CandidateDataContext.Provider>
    );
};

// Custom hook to consume the context
export const useIsLoading = () => useContext(LoadingContext);
export const useModal = () => useContext(ModalContext);
export const useCandidateDetail = () => useContext(CandidateDataContext);
export const useFilterContext = () => useContext(FilterContext);
export const useLoadingMessage = () => useContext(LoadingMessageContext);
