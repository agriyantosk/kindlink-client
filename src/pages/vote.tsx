import { useEffect, useState } from "react";
import VoteCard from "./components/VoteCard";
import { fetchFirebaseWallet, queryIn } from "@/utils/firebase";
import { getAllCandidates } from "@/utils/smartContractInteraction";
import { useAccount } from "wagmi";

const Vote = () => {
    const { address } = useAccount();
    const [candidateWallets, setCandidateWallets] = useState<any>();
    const [candidateInformations, setCandidateInformations] = useState<any>();
    const [candidates, setCandidates] = useState<any>(false);
    const fetchCandidateWallets = async () => {
        try {
            const wallets = await fetchFirebaseWallet("candidateAddresses");
            setCandidateWallets(wallets);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCandidatesInformation = async () => {
        try {
            if (candidateWallets) {
                const informations = await queryIn(candidateWallets);
                return informations;
                // setCandidateInformations(informations);
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
            <div className="w-full h-full">
                <VoteCard candidates={candidates} />
            </div>
        </>
    );
};

export default Vote;
