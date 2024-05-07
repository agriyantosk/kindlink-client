import { abi } from "@/utils/abi";
import { publicClient } from "@/utils/client";
import { fetchData } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { getContract, parseEther } from "viem";
import { getBalance } from "viem/actions";
import { useAccount } from "wagmi";
import Approval from "./components/Approval";
import Withdrawal from "./components/Withdrawal";

const Foundations = () => {
    const [options, setOptions] = useState<"withdraw" | "approve">("withdraw");
    const [contractAddress, setContractAddress] = useState<any>();
    const [contractState, setContractState] = useState<any>();
    const [approvalState, setApprovalState] = useState<any>();
    const [contractBalance, setContractBalance] = useState<any>();
    const { address } = useAccount();

    const getState = async () => {
        try {
            const contract = getContract({
                address: contractAddress,
                abi: abi,
                client: publicClient,
            });
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
            if (contractState && contractState?.isRequestWithdrawal) {
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

    /* 
    JADI ALGO NYA GINI
    1. INDEX CONTRACT ADDRESS NYA DULU [V]
    2. BIKIN GETTER FUNCTION BUAT MAPPING MAU GA MAU [V]
    2. CEK REQUEST STATE DULU. KALO FALSE GAUSAH DILANJUT [V]
    3. REQUEST STATE AKAN PENGARUH KE TERNARY DISPLAY UNTUK NGASIH TUNJUK VIEW DISPLAY REQUEST ATAU APPROVE []
    4. BIKIN FUNCTION WITHDRAW []
    5. KALO TRUE CEK APPROVAL KASIH APPROVAL NYA. LIAT MAPPING SI ADDRESS UDAH APPROVE ATAU BELUM. []
    6. BIKIN FUNCTION APPROVE []

    PENGARUH KE TEMPAT LAIN
    1. DIBAGIAN ADD CLIENT HARUS SEKALIAN ADD KE FIREBASE
    */

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
        if (contractAddress) {
            getState();
        }
    }, [contractAddress]);
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
                    <div
                        className="inline-flex rounded-md w-full justify-center"
                        role="group"
                    >
                        <button
                            type="button"
                            onClick={() => setOptions("withdraw")}
                            className={`px-4 py-2 w-60 text-sm font-medium ease-out transition-all duration-200 ${
                                options === "withdraw"
                                    ? "text-gray-100 bg-blue-500 hover:bg-blue-700 hover:text-gray-200"
                                    : "text-blue-500 hover:bg-gray-100 hover:text-blue-700 bg-white"
                            } border border-gray-200 rounded-l-xl`}
                        >
                            Withdraw
                        </button>
                        <button
                            type="button"
                            onClick={() => setOptions("approve")}
                            className={`px-4 py-2 w-60 text-sm font-medium ease-out transition-all duration-200 ${
                                options === "approve"
                                    ? "text-gray-100 bg-blue-500 hover:bg-blue-700 hover:text-gray-200"
                                    : "text-blue-500 hover:bg-gray-100 hover:text-blue-700 bg-white"
                            } border border-gray-200 rounded-r-xl`}
                        >
                            Approval
                        </button>
                    </div>
                    {options === "withdraw" ? (
                        <Withdrawal
                            contractAddress={contractAddress}
                            contractState={contractState}
                            contractBalance={contractBalance}
                        />
                    ) : (
                        <Approval
                            approvalState={approvalState}
                            contractState={contractState}
                        />
                    )}
                    {/* {contractState && !contractState.isRequestWithdrawal ? (
                        <></>
                    ) : (
                        <>
                            <div className="w-[40%] h-max border border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center">
                                <h1>No Withdrawal Request</h1>
                            </div>
                            <div>
                                <h1>Contract Balance: {contractBalance} ETH</h1>
                            </div>
                        </>
                    )} */}
                </div>
            </div>
        </>
    );
};

export default Foundations;
