import { CandidateEnum, InformationEnum, OwnerEnum } from "@/enum/enum";
import {
    addOwnerAddress,
    deleteFirebaseWallet,
    fetchFirebaseWallets,
    queryIn,
    updateCandidateLosingVote,
    updateCandidateWinningVote,
} from "@/utils/firebase";
import {
    approveCandidate,
    getAllCandidates,
} from "@/utils/smartContractInteraction";
import {
    convertTimestamp,
    extractErrorMessage,
    votingPeriodCompare,
} from "@/utils/utilsFunction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const DevVoteTable = ({ filterOption }: any) => {
    const { address } = useAccount();
    const [candidateWallets, setCandidateWallets] = useState<any>();
    const [candidates, setCandidates] = useState<any>(false);
    const [loading, setIsLoading] = useState<boolean>(false);
    const fetchCandidateWallets = async () => {
        try {
            setIsLoading(true);
            const wallets = await fetchFirebaseWallets(
                CandidateEnum.CollectionName,
                process.env.NEXT_PUBLIC_CANDIDATE_DOCUMENTID as string,
                CandidateEnum.KeyName
            );
            setCandidateWallets(wallets);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCandidatesInformation = async () => {
        try {
            if (candidateWallets) {
                const informations = await queryIn(
                    CandidateEnum.KeyName,
                    candidateWallets
                );
                return informations;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCandidateState = async () => {
        try {
            const smartContractCandidate = await getAllCandidates(
                address,
                candidateWallets
            );
            return smartContractCandidate;
        } catch (error) {
            console.log(error);
        }
    };

    const compileCandidates = async () => {
        try {
            const candidateState = (await fetchCandidateState()) as any[];
            const candidateInformation = await fetchCandidatesInformation();
            if (candidateState && candidateInformation) {
                const matchedData: any[] = [];

                candidateInformation.forEach((infoItem: any) => {
                    const contractItem = candidateState.find(
                        (stateItem: any) =>
                            stateItem.foundationOwnerAddress ===
                            infoItem.foundationOwnerAddress
                    );

                    if (contractItem) {
                        const combinedData = {
                            id: infoItem.id,
                            foundationOwnerAddress:
                                infoItem.foundationOwnerAddress,
                            foundationCoOwnerAddress:
                                contractItem.foundationCoOwnerAddress,
                            websiteUrl: infoItem.websiteUrl,
                            instagramUrl: infoItem.instagramUrl,
                            name: infoItem.name,
                            xUrl: infoItem.xUrl,
                            imgUrl: infoItem.imgUrl,
                            description: infoItem.description,
                            endVotingTime: contractItem.endVotingTime,
                            createdAt: contractItem.createdAt,
                            yesVotes: contractItem.yesVotes,
                            noVotes: contractItem.noVotes,
                            hasVoted: contractItem.hasVoted,
                        };
                        matchedData.push(combinedData);
                    }
                });
                setCandidates(matchedData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidateWallets();
    }, []);

    useEffect(() => {
        if (candidateWallets) {
            compileCandidates();
        }
    }, [candidateWallets]);
    const handleApprove = async (candidateData: any) => {
        let hash: string;
        const toastId = toast.loading("Writing Smart Contract");
        try {
            if (votingPeriodCompare(Number(candidateData.endVotingTime))) {
                const approveSmartContract = await approveCandidate(
                    candidateData.foundationOwnerAddress
                );
                if (approveSmartContract) {
                    hash = approveSmartContract;
                    toast.update(toastId, {
                        render: "Storing Candidate Information",
                    });
                    if (
                        Number(candidateData.yesVotes) >
                        Number(candidateData.noVotes)
                    ) {
                        const updateCandidate =
                            await updateCandidateWinningVote(
                                InformationEnum.CollectionName,
                                {
                                    conrtactAddress:
                                        candidateData.contractAddress,
                                    foundationCoOwnerAddress:
                                        candidateData.foundationCoOwnerAddress,
                                },
                                candidateData.id
                            );
                        const ownerAddresses = [
                            candidateData.foundationCoOwnerAddress,
                            candidateData.foundationCoOwnerAddress,
                        ];
                        const addAddress = await addOwnerAddress(
                            OwnerEnum.CollectionName,
                            ownerAddresses,
                            process.env.NEXT_PUBLIC_OWNER_DOCUMENTID as string
                        );
                    } else {
                        const updateCandidate = await updateCandidateLosingVote(
                            InformationEnum.CollectionName,
                            candidateData.id
                        );
                    }
                    const del = await deleteFirebaseWallet(
                        CandidateEnum.CollectionName,
                        candidateData.foundationOwnerAddress,
                        process.env.NEXT_PUBLIC_CANDIDATE_DOCUMENTID as string,
                        CandidateEnum.KeyName
                    );
                    if (del) {
                        toast.success(
                            ({ closeToast }) => (
                                <div className="custom-toast">
                                    <a
                                        href={`https://sepolia.etherscan.io/address/${hash}`}
                                    >
                                        {`https://sepolia.etherscan.io/address/${hash}`}
                                    </a>
                                </div>
                            ),
                            {
                                autoClose: false,
                            }
                        );
                        toast.dismiss(toastId);
                    }
                }
            }
        } catch (error: any) {
            const errorMessage = error?.shortMessage;
            const extractedMessage = extractErrorMessage(errorMessage);
            toast.error(extractedMessage);
            toast.dismiss(toastId);
        }
    };
    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="relative overflow-y-auto w-full px-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Project Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Yes Votes
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    No Votes
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    End Voting Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        {candidates &&
                            candidates.map((el: any, index: number) => {
                                console.log(candidates);
                                return (
                                    <>
                                        <tbody key={index}>
                                            <tr className="border-b border-gray-400">
                                                <td
                                                    scope="row"
                                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                                                >
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src={el?.imgUrl}
                                                        alt="Foundation Logo"
                                                    />
                                                    <div className="ps-3">
                                                        <div className="text-base font-semibold">
                                                            {el?.name}
                                                        </div>
                                                        <div className="font-normal text-gray-500">
                                                            Category
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {Number(el?.yesVotes)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {Number(el?.noVotes)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <h1 className="font-bold">
                                                        {`${convertTimestamp(
                                                            Number(
                                                                el.endVotingTime
                                                            )
                                                        )} `}
                                                    </h1>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {votingPeriodCompare(
                                                        Number(
                                                            el?.endVotingTime
                                                        )
                                                    )
                                                        ? "Ongoing"
                                                        : "Ended"}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-xs font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]`}
                                                        // disabled={votingPeriodCompare(
                                                        //     Number(
                                                        //         el?.endVotingTime
                                                        //     )
                                                        // )}
                                                        onClick={() =>
                                                            handleApprove(el)
                                                        }
                                                    >
                                                        Approve
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </>
                                );
                            })}
                    </table>
                </div>
            )}
        </>
    );
};

export default DevVoteTable;
