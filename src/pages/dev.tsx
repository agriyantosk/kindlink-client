import { useEffect, useState } from "react";
import DevFilter from "./components/DevFilter";
import DevVoteTable from "./components/DevVoteTable";
import { useFilterContext } from "./components/Layout";
import { fetchData } from "@/utils/firebase";
import AddCandidateForm from "./components/AddCandidateForm";
import DevWithdrawalApproval from "./components/DevWithdrawalApproval";
import { addCandidate } from "@/utils/smartContractInteraction";

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
                            <DevWithdrawalApproval />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dev;
