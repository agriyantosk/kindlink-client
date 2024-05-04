import { useEffect, useState } from "react";
import DevFilter from "./components/DevFilter";
import DevTable from "./components/DevTable";
import { useFilterContext } from "./components/Layout";
import { fetchData } from "@/utils/firebase";

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
                <div className="flex flex-col justify-center items-center w-full gap-10">
                    <DevFilter filter={{ filterOption, setFilterOption }} />
                    <DevTable
                        filterOption={filterOption}
                        candidates={candidates}
                    />
                </div>
            </div>
        </>
    );
};

export default Dev;
