import { abi } from "@/utils/abi";
import { publicClient } from "@/utils/client";
import { fetchData } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { getContract } from "viem";
import { useAccount } from "wagmi";

const Foundations = () => {
    // const getState = async () => {
    //     try {
    //         const data = await publicClient.readContract({
    //             address: "0x4E4be9B1d5A249E9b23e1d132808b6dE495367Da",
    //             abi: abi,
    //             functionName: "ownerAddress",
    //         });
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const [contractAddress, setContractAddress] = useState<any>();
    const { address } = useAccount();
    const getState = async () => {
        try {
            const contract = getContract({
                address: contractAddress,
                abi: abi,
                client: publicClient,
            });
            const data = {
                ownerAddress: await contract.read.ownerAddress(),
                withdrawalAddress: await contract.read.withdrawalAddress(),
                coWithdrawalAddress: await contract.read.coWithdrawalAddress(),
            };
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    function findContractAddressForUser(
        userWalletAddress: string,
        contractDetails: any
    ) {
        for (const contractAddress in contractDetails) {
            const details = contractDetails[contractAddress];
            if (
                details.withdrawalAddress === userWalletAddress ||
                details.coWithdrawalAddress === userWalletAddress
            ) {
                return contractAddress;
            }
        }
        return null;
    }
    const fetchContract = async () => {
        try {
            const data = await fetchData("deployedFoundations");
            const parsed = JSON.parse(data[0].contracts);
            const foundationContract = findContractAddressForUser(
                address as string,
                parsed
            );
            setContractAddress(foundationContract);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchContract();
        getState();
    }, [address]);
    return (
        <>
            <div>
                <h1>Foundations</h1>
                <h1>
                    BAGIAN INI KAYAKNYA BISA LANGSUNG FETCH KE SMART CONTRACT
                    AJA
                </h1>
                <h1>
                    https://dribbble.com/shots/23751665-Withdrawal-Online-banking-platform
                </h1>
                <h1>{JSON.stringify(contractAddress)}</h1>
            </div>
        </>
    );
};

export default Foundations;
