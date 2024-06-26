import { useAccount } from "wagmi";
import Approval from "./Approval";
import { useEffect, useState } from "react";
import { getContract } from "viem";
import { foundationABI, kindlinkAbi } from "@/utils/ABI";
import { publicClient } from "@/utils/client";
import { addFirebaseWallets, deleteFirebaseWallet } from "@/utils/firebase";
import { ApprovalEnum } from "@/enum/enum";
import {
    foundationWithdrawalApprove,
    foundationWithdrawalRequest,
    withdrawal,
} from "@/utils/smartContractInteraction";
import { toast } from "react-toastify";
import {
    checkToDeleteFirebaseApprovalWallets,
    extractErrorMessage,
} from "@/utils/utilsFunction";
import { useIsLoading } from "./Layout";
import { ClipLoader } from "react-spinners";

const Withdrawal = ({ contractState }: any) => {
    const { address } = useAccount();
    console.log(contractState);
    const [allowWithdrawalRequest, setAllowWithdrawalRequest] = useState<any>();
    const { isLoading, setIsLoading } = useIsLoading();

    const checkAllowRequest = async () => {
        try {
            if (contractState) {
                const contract = getContract({
                    address: contractState?.contractAddress,
                    abi: foundationABI,
                    client: publicClient,
                });
                const foundationOwnerAddress =
                    await contract.read.foundationOwnerAddress();
                if (!contractState.isRequestWithdrawal) {
                    setAllowWithdrawalRequest(false);
                    return;
                } else if (
                    !contractState.kindlinkApproval ||
                    !contractState.foundationOwnerApproval ||
                    !contractState.foundationCoOwnerApproval
                ) {
                    setAllowWithdrawalRequest(false);
                    return;
                } else if (address !== foundationOwnerAddress) {
                    setAllowWithdrawalRequest(false);
                    return;
                } else {
                    setAllowWithdrawalRequest(true);
                    return;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRequestWithdrawal = async (state: any) => {
        let hash: string;
        setIsLoading(true);
        const toastId = toast.loading("Writing Smart Contract");
        try {
            if (state.isRequestWithdrawal) {
                throw Error("You have already requested Withdrawal");
            } else if (address !== state.foundationOwnerAddress) {
                throw Error("Only Foundation Owner Can Execute this Action");
            } else {
                const requestWithdrawal = await foundationWithdrawalRequest(
                    state.contractAddress
                );

                if (requestWithdrawal) {
                    hash = requestWithdrawal;
                    toast.update(toastId, {
                        render: "Storing Candidate Information",
                    });
                    const addFirebaseWithdrawalRequest =
                        await addFirebaseWallets(
                            ApprovalEnum.CollectionName,
                            state.contractAddress,
                            process.env
                                .NEXT_PUBLIC_APPROVAL_DOCUMENTID as string,
                            ApprovalEnum.KeyName
                        );
                    if (addFirebaseWithdrawalRequest) {
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
                }
            }
        } catch (error: any) {
            const errorMessage = error?.shortMessage;
            const extractedMessage = extractErrorMessage(errorMessage);
            toast.error(extractedMessage);
            toast.dismiss(toastId);
        } finally {
            setIsLoading(false);
        }
    };

    const handleWithdrawalApprove = async (state: any) => {
        let hash: string;
        setIsLoading(true);
        const toastId = toast.loading("Writing Smart Contract");
        try {
            const check = checkDisableApproval(state);
            if (check) {
                throw Error(
                    "Please Approve With Registered Wallet And Make Sure You Haven't Approved this Withdrawal"
                );
            } else {
                const approveWithdrawal = await foundationWithdrawalApprove(
                    state.contractAddress
                );
                if (approveWithdrawal) {
                    hash = approveWithdrawal;
                    const checkToDelete =
                        checkToDeleteFirebaseApprovalWallets(state);
                    if (checkToDelete) {
                        await deleteFirebaseWallet(
                            ApprovalEnum.CollectionName,
                            state.contractAddress,
                            process.env
                                .NEXT_PUBLIC_APPROVAL_DOCUMENTID as string,
                            ApprovalEnum.KeyName
                        );
                    }
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
            }
        } catch (error: any) {
            const errorMessage = error?.shortMessage;
            const extractedMessage = extractErrorMessage(errorMessage);
            toast.error(extractedMessage);
            toast.dismiss(toastId);
        } finally {
            setIsLoading(false);
        }
    };

    const checkDisableApproval = (state: any) => {
        if (address === state.foundationOwnerAddress) {
            if (!state.foundationOwnerApproval) {
                return true;
            }
        } else if (address === state.foundationCoOwnerAddress) {
            if (!state.foundationCoOwnerApproval) {
                return true;
            }
        } else {
            return false;
        }
    };

    const handleWithdrawal = async (state: any) => {
        let hash: string;
        setIsLoading(true);
        const toastId = toast.loading("Writing Smart Contract");
        try {
            if (!allowWithdrawalRequest) {
                throw Error("Haven't met the withdrawal requirements");
            } else if (address !== state.foundationOwnerAddress) {
                throw Error(
                    "Please Withdraw With The Registered Foundation Owner Address"
                );
            } else {
                const executeWithdrawal = await withdrawal(
                    state.contractAddress
                );
                if (executeWithdrawal) {
                    hash = executeWithdrawal;
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
            }
        } catch (error: any) {
            const errorMessage = error?.shortMessage;
            const extractedMessage = extractErrorMessage(errorMessage);
            toast.error(extractedMessage);
            toast.dismiss(toastId);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (contractState) {
            checkAllowRequest();
        }
    }, [contractState]);
    return (
        <>
            <div className="flex flex-col h-full gap-10">
                {contractState && (
                    <>
                        <div>
                            <div className="flex gap-3">
                                <h1>
                                    Contract Address:{" "}
                                    {contractState?.contractAddress}
                                </h1>
                                <h1>
                                    <a
                                        href={`https://sepolia.etherscan.io/address/${contractState?.contractAddress}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg
                                            viewBox="0 0 123 123"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 cursor-pointer"
                                        >
                                            <path
                                                d="M25.79 58.4149C25.7901 57.7357 25.9244 57.0633 26.1851 56.4361C26.4458 55.809 26.8278 55.2396 27.3092 54.7605C27.7907 54.2814 28.3619 53.9021 28.9903 53.6444C29.6187 53.3867 30.2918 53.2557 30.971 53.2589L39.561 53.2869C40.9305 53.2869 42.244 53.831 43.2124 54.7994C44.1809 55.7678 44.725 57.0813 44.725 58.4509V90.9309C45.692 90.6439 46.934 90.3379 48.293 90.0179C49.237 89.7962 50.0783 89.262 50.6805 88.5019C51.2826 87.7418 51.6102 86.8006 51.61 85.8309V45.5409C51.61 44.1712 52.154 42.8576 53.1224 41.889C54.0908 40.9204 55.4043 40.3762 56.774 40.3759H65.381C66.7506 40.3762 68.0641 40.9204 69.0325 41.889C70.0009 42.8576 70.545 44.1712 70.545 45.5409V82.9339C70.545 82.9339 72.7 82.0619 74.799 81.1759C75.5787 80.8462 76.2441 80.2941 76.7122 79.5886C77.1803 78.8832 77.4302 78.0555 77.431 77.2089V32.6309C77.431 31.2615 77.9749 29.9481 78.9431 28.9797C79.9113 28.0113 81.2245 27.4672 82.5939 27.4669H91.201C92.5706 27.4669 93.884 28.0109 94.8525 28.9794C95.8209 29.9478 96.365 31.2613 96.365 32.6309V69.3399C103.827 63.9319 111.389 57.4279 117.39 49.6069C118.261 48.4717 118.837 47.1386 119.067 45.7267C119.297 44.3148 119.174 42.8678 118.709 41.5149C115.931 33.5227 111.516 26.1983 105.745 20.0105C99.974 13.8228 92.9749 8.90785 85.1955 5.58032C77.4161 2.2528 69.0277 0.585938 60.5671 0.686416C52.1065 0.786893 43.7601 2.6525 36.062 6.16383C28.3638 9.67517 21.4834 14.7549 15.8611 21.078C10.2388 27.401 5.99842 34.8282 3.41131 42.8842C0.824207 50.9401 -0.0526487 59.4474 0.836851 67.8617C1.72635 76.276 4.36263 84.4119 8.57696 91.7489C9.31111 93.0145 10.3912 94.0444 11.6903 94.7175C12.9894 95.3906 14.4536 95.679 15.911 95.5489C17.539 95.4059 19.566 95.2029 21.976 94.9199C23.0251 94.8008 23.9937 94.2999 24.6972 93.5126C25.4008 92.7253 25.7901 91.7067 25.791 90.6509L25.79 58.4149Z"
                                                fill="#21325B"
                                            />
                                            <path
                                                d="M25.6021 110.51C34.6744 117.11 45.3959 121.072 56.5802 121.957C67.7646 122.841 78.9757 120.615 88.9731 115.523C98.9705 110.431 107.364 102.673 113.226 93.1068C119.087 83.5405 122.188 72.539 122.185 61.3197C122.185 59.9197 122.12 58.5347 122.027 57.1577C99.808 90.2957 58.7831 105.788 25.604 110.505"
                                                fill="#979695"
                                            />
                                        </svg>
                                    </a>
                                </h1>
                            </div>
                            <div className="h-max w-1/2 border border-gray-400 rounded-lg p-5">
                                <h1>
                                    Status:{" "}
                                    {contractState?.isRequestWithdrawal
                                        ? "Ongoing Withdrawal"
                                        : "No Ongoing Withdrawal"}
                                </h1>
                            </div>
                            <Approval
                                approvalState={{
                                    kindlinkApproval:
                                        contractState?.kindlinkApproval,
                                    foundationOwnerApproval:
                                        contractState?.foundationOwnerApproval,
                                    foundationCoOwnerApproval:
                                        contractState?.foundationCoOwnerApproval,
                                }}
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">
                                {contractState?.balance}
                            </h1>
                            <h1>Total Funds Received</h1>
                        </div>
                        <div>
                            {contractState?.isRequestWithdrawal ? (
                                <div className="flex gap-5">
                                    <button
                                        className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] ${
                                            isLoading ||
                                            (contractState &&
                                                checkDisableApproval(
                                                    contractState
                                                ))
                                                ? ""
                                                : "cursor-not-allowed"
                                        }`}
                                        disabled={isLoading(
                                            contractState &&
                                                checkDisableApproval(
                                                    contractState
                                                )
                                        )}
                                        onClick={() =>
                                            handleWithdrawalApprove(
                                                contractState
                                            )
                                        }
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] ${
                                            isLoading ||
                                            (allowWithdrawalRequest &&
                                                address ===
                                                    contractState.foundationOwnerAddress)
                                                ? ""
                                                : "cursor-not-allowed"
                                        }`}
                                        disabled={
                                            !allowWithdrawalRequest ||
                                            address !==
                                                contractState.foundationOwnerAddress
                                        }
                                        onClick={() =>
                                            handleWithdrawal(contractState)
                                        }
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleRequestWithdrawal(contractState);
                                    }}
                                    className={`rounded-md bg-gradient-to-br flex items-center justify-center from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] ${
                                        isLoading ||
                                        address !==
                                            contractState.foundationOwnerAddress
                                            ? "cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={
                                        isLoading ||
                                        address !==
                                            contractState?.foundationOwnerAddress
                                    }
                                >
                                    {isLoading ? (
                                        <ClipLoader size={25} />
                                    ) : (
                                        "Request Withdrawal"
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Withdrawal;
