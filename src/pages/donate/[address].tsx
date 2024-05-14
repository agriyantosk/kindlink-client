import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { queryEqualsTo } from "@/utils/firebase";
import FoundationSocials from "../components/FoundationSocials";
import { getAllListedFoundation } from "@/utils/smartContractInteraction";
import { convertTimestamp } from "@/utils/utilsFunction";
import { Button, Tooltip } from "flowbite-react";

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
            console.log(data);
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
                    <div className="w-full flex flex-col justify-start h-full">
                        <img
                            src={detail[0]?.imgUrl}
                            className="object-contain h-full"
                            alt="Foundation Logo"
                        />
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
                    <div className="w-full flex flex-col gap-5">
                        <div>
                            <h1 className="font-bold text-5xl">
                                {detail[0]?.name}
                            </h1>
                            <p>
                                Contract Address: {detail[0]?.contractAddress}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-5">
                                <Tooltip
                                    content={
                                        contractDetail &&
                                        contractDetail[0]
                                            ?.foundationOwnerAddress
                                    }
                                    className="text-xs"
                                >
                                    <Button
                                        size="s"
                                        className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-xs font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                                    >
                                        Foundation Co Owner Address
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    content={
                                        contractDetail &&
                                        convertTimestamp(
                                            Number(
                                                contractDetail[0]?.endVotingTime
                                            )
                                        )
                                    }
                                    className="text-xs"
                                >
                                    <Button
                                        size="s"
                                        className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-xs font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                                    >
                                        Ended Voting Time
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className="flex gap-5">
                                <Tooltip
                                    content={
                                        contractDetail &&
                                        contractDetail[0]
                                            ?.foundationCoOwnerAddress
                                    }
                                    className="text-xs"
                                >
                                    <Button
                                        size="s"
                                        className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-xs font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                                    >
                                        Foundation Owner Address
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    content={
                                        contractDetail &&
                                        Number(
                                            contractDetail[0]
                                                ?.totalInvolvedParticipants
                                        )
                                    }
                                    className="text-xs"
                                >
                                    <Button
                                        size="s"
                                        className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-xs font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                                    >
                                        Total Vote Participants
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="overflow-y-auto h-full">
                            <h1 className="font-bold">About the foundation:</h1>
                            <p className="text-justify text-sm">
                                {detail[0]?.description}
                            </p>
                        </div>
                        <div className="flex justify-start">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="donationAmount">
                                    Enter Donation:
                                </label>
                                <div className="flex gap-5">
                                    <input
                                        type="text"
                                        id="donationAmount"
                                        name="donationAmount"
                                        placeholder="1 ETH"
                                        className="rounded-xl"
                                    />
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Detail;

{
    /* <div className="relative shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Foundation Owner Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Foundation Co Owner Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Participants
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ended Voting Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {contractDetail &&
                                                contractDetail[0]
                                                    ?.foundationOwnerAddress}
                                        </th>
                                    </td>
                                    <td className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {contractDetail &&
                                                contractDetail[0]
                                                    ?.foundationCoOwnerAddress}
                                        </th>
                                    </td>
                                    <td className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {Number(
                                                contractDetail &&
                                                    contractDetail[0]
                                                        ?.totalInvolvedParticipants
                                            )}
                                        </th>
                                    </td>
                                    <td className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {contractDetail &&
                                                convertTimestamp(
                                                    Number(
                                                        contractDetail[0]
                                                            ?.endVotingTime
                                                    )
                                                )}
                                        </th>
                                    </td>
                                </tbody>
                            </table>
                        </div> */
}
