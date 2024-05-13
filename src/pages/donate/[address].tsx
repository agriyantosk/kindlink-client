import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { queryEqualsTo } from "@/utils/firebase";
import FoundationSocials from "../components/FoundationSocials";
import { getAllListedFoundation } from "@/utils/smartContractInteraction";
import { convertTimestamp } from "@/utils/utilsFunction";

interface FoundationContractDetailPayload {
    contractAddress: string;
    foundationOwnerAddress: string;
    foundationCoOwnerAddress: string;
    totalInvolvedParticipants: number;
    endVotingTime: number;
}

const Detail = () => {
    const router = useRouter();
    const { address } = router.query;
    const [detail, setDetail] = useState<any>();
    const [contractDetail, setContractDetail] = useState<any>();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const donationAmount = formData.get("donationAmount");
        console.log("Donation amount:", donationAmount);
    };

    const fetchFoundationDetails = async () => {
        try {
            const data = await queryEqualsTo(
                "information",
                "contractAddress",
                address as string
            );
            setDetail(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchContractDetail = async () => {
        try {
            const data = await getAllListedFoundation([
                address as `0x${string}`,
            ]);
            setContractDetail(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (address) {
            fetchFoundationDetails();
            fetchContractDetail();
        }
    }, [address]);

    return (
        <>
            {detail && (
                <div className="flex justify-center mt-10 gap-5 h-[70%]">
                    <div className="w-full flex justify-start">
                        <img
                            src={detail[0]?.imgUrl}
                            className="object-contain"
                            alt="Foundation Logo"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-5 overflow-y-auto">
                        <div>
                            <h1 className="font-bold text-5xl">
                                {detail[0]?.name}
                            </h1>
                            <p>
                                Contract Address: {detail[0]?.contractAddress}
                            </p>
                        </div>
                        <div>
                            <h1>About the foundation:</h1>
                            <p className="text-justify">
                                {detail[0]?.description}
                            </p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="donationAmount">
                                    Enter Donation:
                                </label>
                                <input
                                    type="text"
                                    id="donationAmount"
                                    name="donationAmount"
                                />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        <div>
                            <h1>
                                contractAddress:{" "}
                                {contractDetail &&
                                    contractDetail[0]?.contractAddress}
                            </h1>
                            <h1>
                                foundationOwnerAddress:{" "}
                                {contractDetail &&
                                    contractDetail[0]?.foundationOwnerAddress}
                            </h1>
                            <h1>
                                foundationCoOwnerAddress:{" "}
                                {contractDetail &&
                                    contractDetail[0]?.foundationCoOwnerAddress}
                            </h1>
                            <h1>
                                totalInvolvedParticipants:{" "}
                                {Number(
                                    contractDetail &&
                                        contractDetail[0]
                                            ?.totalInvolvedParticipants
                                )}
                            </h1>
                            <h1>
                                endVotingTime:{" "}
                                {contractDetail &&
                                    convertTimestamp(
                                        Number(contractDetail[0]?.endVotingTime)
                                    )}
                            </h1>
                        </div>
                        <div>
                            <FoundationSocials
                                page={"donate"}
                                websiteUrl={detail[0]?.websiteUrl}
                                instagramUrl={detail[0]?.instagraUrl}
                                xUrl={detail[0]?.xUrl}
                                contractAddress={detail[0]?.contractAddress}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Detail;
