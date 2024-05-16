import { useEffect, useState } from "react";
import DevFilter from "./components/DevFilter";
import DevVoteTable from "./components/DevVoteTable";
import { useFilterContext } from "./components/Layout";
import { fetchFirebaseWallets, queryIn } from "@/utils/firebase";
import AddCandidateForm from "./components/AddCandidateForm";
import DevWithdrawalApproval from "./components/DevWithdrawalApproval";
import { getAllCandidates } from "@/utils/smartContractInteraction";
import { useAccount } from "wagmi";

const Dev = () => {
    const { address } = useAccount();
    const { filterOption, setFilterOption } = useFilterContext();
    const [candidateWallets, setCandidateWallets] = useState<any>();
    const [candidates, setCandidates] = useState<any>(false);
    const fetchCandidateWallets = async () => {
        try {
            const wallets = await fetchFirebaseWallets(
                "candidateAddresses",
                "kjqc51iTPhLPAtFqdRoZ",
                "foundationOwnerAddress"
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
                    "foundationOwnerAddress",
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
                    ) : // ini sama kayak ngambil votes harus fetch ke smart contract dan ngambil information dari firebase
                    filterOption === "add" ? (
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
