import { useEffect, useState } from "react";
import DonationCard from "../components/DonationCard";
import { fetchFirebaseDate, queryIn } from "@/utils/firebase";

const Donate = () => {
    const [foundations, setFoundations] = useState<any>();
    const fetchFoundations = async () => {
        try {
            const data = await fetchFirebaseDate(
                "foundationAddresses",
                "2vvLJqomt3wPX4fssSyT"
            );
            if (data) {
                const info = await queryIn(data);
                setFoundations(info);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchFoundations();
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
