import { abi } from "@/utils/abi";
import { publicClient } from "@/utils/client";
import { fetchData } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { getContract, parseEther } from "viem";
import { useAccount } from "wagmi";
import Withdrawal from "./components/Withdrawal";

const Foundations = () => {
    const [contractAddress, setContractAddress] = useState<any>();
    const [contractState, setContractState] = useState<any>();
    const [approvalState, setApprovalState] = useState<any>();
    const [contractBalance, setContractBalance] = useState<any>();
    const { address } = useAccount();
    const contract = getContract({
        address: contractAddress,
        abi: abi,
        client: publicClient,
    });

    const getContractState = async () => {
        try {
            if (contractAddress) {
                const balance = await publicClient.getBalance({
                    address: contractAddress,
                    blockTag: "latest",
                });
                setContractBalance(Number(balance) / 1e18);
            }
            const state = {
                isRequestWithdrawal: await contract.read.isRequestWithdrawal(),
                ownerAddress: await contract.read.ownerAddress(),
                withdrawalAddress: await contract.read.withdrawalAddress(),
                coWithdrawalAddress: await contract.read.coWithdrawalAddress(),
            };
            setContractState(state);
        } catch (error) {
            console.log(error);
        }
    };
    const getApprovalState = async () => {
        try {
            if (contractState) {
                setApprovalState({
                    ownerAddressHasApproved: await contract.read.getHasApproved(
                        [contractState.ownerAddress]
                    ),
                    withdrawalAddress: await contract.read.getHasApproved([
                        contractState.withdrawalAddress,
                    ]),
                    coWithdrawalAddress: await contract.read.getHasApproved([
                        contractState.coWithdrawalAddress,
                    ]),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const findContractAddressForUser = (
        userWalletAddress: string,
        contractDetails: any
    ) => {
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
    };
    const fetchContractAddress = async () => {
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
        fetchContractAddress();
        getContractState();
    }, [contractAddress]);
    useEffect(() => {
        getApprovalState();
    }, [contractState]);
    return (
        <>
            <div className="w-full h-full flex border bg-white border-gray-400 rounded-lg p-10 gap-10">
                <div className="w-[50%] h-full">
                    <img
                        src="https://cdn-icons-png.freepik.com/512/3678/3678079.png"
                        alt="Withdrawal Icon"
                        className="object-cover h-full w-full"
                    />
                </div>
                <div className="w-[50%] flex flex-col gap-10">
                    <Withdrawal
                        contractAddress={contractAddress}
                        contractState={contractState}
                        contractBalance={contractBalance}
                        approvalState={approvalState}
                    />
                </div>
            </div>
        </>
    );
};

export default Foundations;
