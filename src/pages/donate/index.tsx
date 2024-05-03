import { useEffect, useState } from "react";
import DonationCard from "../components/DonationCard";
import { fetchData } from "@/utils/firebase";

const Donate = () => {
    const [foundations, setFoundations] = useState();
    const fetchCandidates = async () => {
        try {
            const data = await fetchData("foundations");
            setFoundations(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCandidates();
    }, []);
    return (
        <>
            <div>
                <DonationCard foundations={foundations} />
            </div>
        </>
    );
};

export default Donate;
