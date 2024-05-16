import { useEffect, useState } from "react";
import DonationCard from "../components/DonationCard";
import { fetchFirebaseWallets, queryIn } from "@/utils/firebase";
import { getAllListedFoundation } from "@/utils/smartContractInteraction";
import { getBalance } from "viem/actions";
import { FoundationEnum } from "@/enum/enum";

const Donate = () => {
    const [foundationWallets, setFoundationWallets] = useState<any>();
    const [foundations, setFoundations] = useState<any>();

    const fetchFoundationWallets = async () => {
        try {
            const data = await fetchFirebaseWallets(
                FoundationEnum.CollectionName,
                FoundationEnum.DocumentId,
                FoundationEnum.KeyName
            );
            setFoundationWallets(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFoundationInformation = async () => {
        try {
            if (foundationWallets) {
                const informations = await queryIn(
                    FoundationEnum.KeyName,
                    foundationWallets
                );
                return informations;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fecthFoundationState = async () => {
        try {
            const smartContractFoundations = await getAllListedFoundation(
                foundationWallets
            );
            return smartContractFoundations;
        } catch (error) {
            console.log(error);
        }
    };

    const compileFoundation = async () => {
        try {
            const foundationState = (await fecthFoundationState()) as any[];
            const foundationInformation = await fetchFoundationInformation();
            if (foundationState && foundationInformation) {
                const matchedData: any[] = [];

                foundationInformation.forEach((infoItem: any) => {
                    const contractItem = foundationState.find(
                        (stateItem: any) =>
                            stateItem.foundationOwnerAddress ===
                            infoItem.foundationOwnerAddress
                    );

                    if (contractItem) {
                        const combinedData = {
                            id: infoItem.id,
                            contractAddress: contractItem.contractAddress,
                            foundationOwnerAddress:
                                contractItem.foundationOwnerAddress,
                            foundationCoOwnerAddress:
                                contractItem.foundationCoOwnerAddress,
                            websiteUrl: infoItem.websiteUrl,
                            instagramUrl: infoItem.instagramUrl,
                            name: infoItem.name,
                            xUrl: infoItem.xUrl,
                            imgUrl: infoItem.imgUrl,
                            description: infoItem.description,
                            involvedParticipants:
                                contractItem.totalInvolvedParticipants,
                            endVotingTime: contractItem.endVotingTime,
                        };
                        matchedData.push(combinedData);
                    }
                });
                setFoundations(matchedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFoundationWallets();
    }, []);

    useEffect(() => {
        if (foundationWallets) {
            compileFoundation();
        }
    }, [foundationWallets]);

    return (
        <>
            <div>
                <DonationCard foundations={foundations} />
            </div>
        </>
    );
};

export default Donate;
