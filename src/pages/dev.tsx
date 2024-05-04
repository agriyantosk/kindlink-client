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
            <div className="w-full h-full flex justify-center items-start border bg-white border-gray-400 rounded-lg py-10">
                <div className="flex flex-col h-full justify-center items-center w-full gap-10">
                    <DevFilter filter={{ filterOption, setFilterOption }} />
                    {filterOption === "progress" ? (
                        <DevVoteTable
                            filterOption={filterOption}
                            candidates={candidates}
                        />
                    ) : filterOption === "add" ? (
                        <AddCandidateForm />
                    ) : (
                        "withdraw"
                    )}
                </div>
            </div>
        </>
    );
};

export default Dev;
