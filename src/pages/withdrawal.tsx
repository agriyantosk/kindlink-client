import { foundationABI } from "@/utils/ABI";
import { publicClient } from "@/utils/client";
import { queryIn } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { getContract } from "viem";
import { useAccount } from "wagmi";
import Withdrawal from "../components/Withdrawal";

const Foundations = () => {
    const [contractAddress, setContractAddress] = useState<any>();
    const [contractState, setContractState] = useState<any>();
    const [addresses, setAddresses] = useState<any>();
    const { address } = useAccount();

    const getContractState = async () => {
        try {
            if (contractAddress) {
                const contract = getContract({
                    address: contractAddress,
                    abi: foundationABI,
                    client: publicClient,
                });
                const approvalState = await contract.read.getApprovalState();
                if (approvalState) {
                    const state = {
                        ...approvalState,
                        balance: await getContractBalance(contractAddress),
                        foundationOwnerAddress:
                            addresses.foundationOwnerAddress,
                        foundationCoOwnerAddress:
                            addresses.foundationCoOwnerAddress,
                    };
                    setContractState(state);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getContractBalance = async (contractAddress: string) => {
        try {
            const balance = await publicClient.getBalance({
                address: contractAddress as `0x${string}`,
            });
            return `${Number(balance) / 1e18} ETH`;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchContractAddress = async () => {
        try {
            let data: any;
            data = await queryIn("foundationOwnerAddress", [address as string]);
            if (data.length === 0) {
                data = await queryIn("foundationCoOwnerAddress", [
                    address as string,
                ]);
            }
            if (data) {
                setContractAddress(data[0]?.contractAddress);
                setAddresses({
                    foundationOwnerAddress: data[0]?.foundationOwnerAddress,
                    foundationCoOwnerAddress: data[0]?.foundationCoOwnerAddress,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (address) {
            fetchContractAddress();
        }
    }, [address]);

    useEffect(() => {
        if (contractAddress && addresses) {
            getContractState();
        }
    }, [contractAddress, addresses]);
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
                    <Withdrawal contractState={contractState} />
                </div>
            </div>
        </>
    );
};

export default Foundations;
