import { useEffect, useState } from "react";
import DevFilter from "./components/DevFilter";
import DevVoteTable from "./components/DevVoteTable";
import { useFilterContext } from "./components/Layout";
import { fetchData } from "@/utils/firebase";
import AddCandidateForm from "./components/AddCandidateForm";

const Dev = () => {
    const { filterOption, setFilterOption } = useFilterContext();
    const [candidates, setCandidates] = useState();
    const fetchCandidates = async () => {
        try {
            const data = await fetchData("candidates");
            setCandidates(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCandidates();
    }, []);
    return (
        <>
            <div className="w-full h-full flex flex-col items-center border bg-white border-gray-400 rounded-lg py-10 gap-10">
                <div className="top-4 left-4">
                    <DevFilter filter={{ filterOption, setFilterOption }} />
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-10 overflow-y-auto">
                    {filterOption === "progress" ? (
                        <DevVoteTable
                            filterOption={filterOption}
                            candidates={candidates}
                        />
                    ) : filterOption === "add" ? (
                        <AddCandidateForm />
                    ) : (
                        <div>
                            <h1>
                                1. fetch dari firebase yang bagian "approval"
                            </h1>
                            <h1>
                                2. bikin button function untuk approve each
                                contractAddress
                            </h1>
                            <h1>3. hapus ketika approve berhasil</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dev;
