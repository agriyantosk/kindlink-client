import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { queryEqualsTo } from "@/utils/firebase";
import FoundationSocials from "../components/FoundationSocials";
import {
    donate,
    getAllListedFoundation,
} from "@/utils/smartContractInteraction";
import { convertTimestamp, extractErrorMessage } from "@/utils/utilsFunction";
import { Button, Tooltip } from "flowbite-react";
import { toast } from "react-toastify";

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
    const [value, setValue] = useState<number | undefined>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
        value: string | undefined | number,
        foundationContractAddress: string
    ) => {
        let hash: string;
        const toastId = toast.loading("Writing Smart Contract");
        try {
            event.preventDefault();
            if (!value || !foundationContractAddress) {
                return new Error("Invalid Input");
            }
            const convertToNumber = Number(value);
            const executeDonation = await donate(
                foundationContractAddress,
                convertToNumber
            );
            if (executeDonation) {
                hash = executeDonation;
                toast.success(
                    ({ closeToast }) => (
                        <div className="custom-toast">
                            <a
                                href={`https://sepolia.etherscan.io/tx/${hash}`}
                            >
                                {`https://sepolia.etherscan.io/tx/${hash}`}
                            </a>
                        </div>
                    ),
                    {
                        autoClose: false,
                    }
                );
                toast.dismiss(toastId);
            }
        } catch (error: any) {
            const errorMessage = error?.shortMessage;
            const extractedMessage = extractErrorMessage(errorMessage);
            toast.error(extractedMessage);
            toast.dismiss(toastId);
        }
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
                                            ?.foundationCoOwnerAddress
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
                                            ?.foundationOwnerAddress
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
                            <form
                                onSubmit={(event) =>
                                    handleSubmit(
                                        event,
                                        value,
                                        contractDetail[0]?.contractAddress
                                    )
                                }
                            >
                                <label htmlFor="donationAmount">
                                    Enter Donation:
                                </label>
                                <div className="flex gap-5">
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        id="donationAmount"
                                        name="donationAmount"
                                        placeholder="1 ETH"
                                        className="rounded-xl"
                                    />
                                    <button
                                        className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-xs font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
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
