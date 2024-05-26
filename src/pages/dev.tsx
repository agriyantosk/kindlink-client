import DevFilter from "./components/DevFilter";
import DevVoteTable from "./components/DevVoteTable";
import { useFilterContext } from "./components/Layout";
import AddCandidateForm from "./components/AddCandidateForm";
import DevWithdrawalApproval from "./components/DevWithdrawalApproval";

const Dev = () => {
    const { filterOption, setFilterOption } = useFilterContext();

    return (
        <>
            <div className="w-full h-full flex flex-col items-center border bg-white border-gray-400 rounded-lg py-10 gap-10">
                <div className="top-4 left-4">
                    <DevFilter filter={{ filterOption, setFilterOption }} />
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-10 overflow-y-auto">
                    {filterOption === "progress" ? (
                        <DevVoteTable filterOption={filterOption} />
                    ) : filterOption === "add" ? (
                        <AddCandidateForm />
                    ) : (
                        <DevWithdrawalApproval />
                    )}
                </div>
            </div>
        </>
    );
};

export default Dev;
