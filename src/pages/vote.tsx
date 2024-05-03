import { useEffect, useState } from "react";
import VoteCard from "./components/VoteCard";
import { fetchData } from "@/utils/firebase";

const Vote = () => {
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
            <div className="w-full h-full bg-red-400">
                <VoteCard candidates={candidates} />
            </div>
        </>
    );
};

export default Vote;
