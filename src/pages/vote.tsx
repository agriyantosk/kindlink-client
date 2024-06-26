import { useEffect, useState } from "react";
import VoteCard from "../components/VoteCard";
import { fetchFirebaseWallets, queryIn } from "@/utils/firebase";
import { getAllCandidates } from "@/utils/smartContractInteraction";
import { useAccount } from "wagmi";
import { CandidateEnum } from "@/enum/enum";
import ConnectButtonComponent from "../components/ConnectButton";
import NoData from "@/components/NoData";

const Vote = () => {
    const { address, isConnected } = useAccount();
    const [candidateWallets, setCandidateWallets] = useState<any>();
    const [candidates, setCandidates] = useState<any>();
    const fetchCandidateWallets = async () => {
        try {
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
                        console.log(combinedData);
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
                {!isConnected && (
                    <div className="flex justify-center items-center h-full">
                        <h1>
                            Looks like your wallet isn&apos;t connected.
                            You&apos;ll need to connect your wallet to
                            participate.
                        </h1>
                    </div>
                )}
                {candidates?.length === 0 ? (
                    <NoData input={"No Available Voting Currenly Available"} />
                ) : (
                    <VoteCard
                        candidates={candidates}
                        refetch={compileCandidates}
                    />
                )}
            </div>
        </>
    );
};

export default Vote;
