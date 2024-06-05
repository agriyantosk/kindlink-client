import { publicClient } from "@/utils/client";
import {
    deleteFirebaseWallet,
    fetchFirebaseWallets,
    queryIn,
} from "@/utils/firebase";
import { foundationABI } from "@/utils/ABI";
import { useEffect, useState } from "react";
import { getContract } from "viem";
import { foundationWithdrawalApprove } from "@/utils/smartContractInteraction";
import { ApprovalEnum, DevEnum, InformationEnum } from "@/enum/enum";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/utils/utilsFunction";
import NoData from "./NoData";
import { useAccount } from "wagmi";

const DevWithdrawalApproval = () => {
    const { address } = useAccount();
    const [approvalWallets, setApprovalWallets] = useState<any[]>([]);
    const [approvalInformations, setApprovalInformations] = useState<any[]>([]);
    const [approvals, setApprovals] = useState<any[]>([]);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [isDev, setIsDev] = useState();

    const fetchApprovalWallets = async () => {
        try {
            setIsLoading(true);
            const withdrawalData = await fetchFirebaseWallets(
                ApprovalEnum.CollectionName,
                process.env.NEXT_PUBLIC_APPROVAL_DOCUMENTID as string,
                ApprovalEnum.KeyName
            );
            setApprovalWallets(withdrawalData);
        } catch (error) {
            console.log(error);
        }
    };

    const checkDevAddress = async (userAddress: string) => {
        try {
            const devAddress = await fetchFirebaseWallets(
                DevEnum.CollectionName,
                process.env.NEXT_PUBLIC_DEV_DOCUMENTID as string,
                DevEnum.KeyName
            );
            const check =
                devAddress && devAddress.find((el: any) => el === userAddress);
            setIsDev(check);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchApprovalInformation = async () => {
        try {
            if (approvalWallets && approvalWallets.length !== 0) {
                const info = await queryIn(
                    InformationEnum.KeyName,
                    approvalWallets
                );
                if (info && info.length !== 0) {
                    setApprovalInformations(info);
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

    const handleWithdrawalApprove = async (state: any) => {
        let hash: string;
        const toastId = toast.loading("Writing Smart Contract");
        try {
            if (state.kindlinkApproval) {
                throw Error("You already Approve This Withdrawal Request");
            } else if (!isDev) {
                throw Error("You are not Kindlink Devs");
            } else {
                const approveWithdraw = await foundationWithdrawalApprove(
                    state.contractAddress
                );
                if (approveWithdraw) {
                    hash = approveWithdraw;
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
        } catch (error: any) {
            const errorMessage = error?.shortMessage;
            const extractedMessage = extractErrorMessage(errorMessage);
            toast.error(extractedMessage);
            toast.dismiss(toastId);
        }
    };

    const fetchContractState = async () => {
        try {
            let compiledData = [];

            if (approvalInformations) {
                for (let i = 0; i < approvalInformations.length; i++) {
                    const approval = approvalInformations[i];

                    const contract = getContract({
                        address: approval.contractAddress,
                        abi: foundationABI,
                        client: publicClient,
                    });

                    const approvalState: any =
                        await contract.read.getApprovalState();
                    const state = {
                        ...approvalInformations[i],
                        balance: await getContractBalance(
                            approval.contractAddress
                        ),
                        isRequestWithdrawal: approvalState.isRequestWithdrawal,
                        kindlinkApproval: approvalState.kindlinkApproval,
                        foundationOwnerApproval:
                            approvalState.foundationOwnerApproval,
                        foundationCoOwnerApproval:
                            approvalState.foundationCoOwnerApproval,
                    };
                    compiledData.push(state);
                }
                setApprovals(compiledData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApprovalWallets();
    }, []);

    useEffect(() => {
        if (approvalWallets && approvalWallets.length !== 0) {
            fetchApprovalInformation();
        }
    }, [approvalWallets]);

    useEffect(() => {
        if (approvalInformations && approvalInformations.length !== 0) {
            fetchContractState();
        } else {
            setIsLoading(false);
        }
    }, [approvalInformations]);

    useEffect(() => {
        if (address) {
            checkDevAddress(address);
        }
    }, [address]);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : approvals.length === 0 ? (
                <>
                    <NoData input="No Withdrawal Request Currently Available" />
                </>
            ) : (
                <div className="relative overflow-y-auto w-full px-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase">
                            <tr>
                                <th scope="col" className="px-3 py-1.5">
                                    Project Name
                                </th>
                                <th scope="col" className="px-3 py-1.5">
                                    Contract Address
                                </th>
                                <th scope="col" className="px-3 py-1.5">
                                    Withdrawal Funds
                                </th>
                                <th scope="col" className="px-3 py-1.5">
                                    Kindlink Approval
                                </th>
                                <th scope="col" className="px-3 py-1.5">
                                    Owner Approval
                                </th>
                                <th scope="col" className="px-3 py-1.5">
                                    Co Owner Appro
                                </th>
                                <th scope="col" className="px-3 py-1.5">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        {approvals &&
                            approvals.map((el: any, index: number) => {
                                return (
                                    <>
                                        <tbody key={index}>
                                            <tr className="border-b border-gray-400">
                                                <td
                                                    scope="row"
                                                    className="flex items-center px-3 py-2 text-gray-900 whitespace-nowrap"
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
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {el?.contractAddress}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {el?.balance}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {el?.kindlinkApproval ? (
                                                        <svg
                                                            viewBox="0 0 32 32"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="30px"
                                                            width="30px"
                                                        >
                                                            <defs></defs>
                                                            <title />
                                                            <g
                                                                data-name="Layer 28"
                                                                id="Layer_28"
                                                            >
                                                                <path
                                                                    className="cls-1"
                                                                    d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
                                                                />
                                                                <path
                                                                    className="cls-1"
                                                                    d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
                                                                />
                                                            </g>
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            viewBox="0 0 512 512"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="30px"
                                                            width="30px"
                                                        >
                                                            <title />
                                                            <g
                                                                data-name="1"
                                                                id="_1"
                                                                className="text-red-300"
                                                            >
                                                                <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" />
                                                                <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" />
                                                                <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" />
                                                            </g>
                                                        </svg>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {el?.foundationOwnerApproval ? (
                                                        <svg
                                                            viewBox="0 0 32 32"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="30px"
                                                            width="30px"
                                                        >
                                                            <defs></defs>
                                                            <title />
                                                            <g
                                                                data-name="Layer 28"
                                                                id="Layer_28"
                                                            >
                                                                <path
                                                                    className="cls-1"
                                                                    d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
                                                                />
                                                                <path
                                                                    className="cls-1"
                                                                    d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
                                                                />
                                                            </g>
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            viewBox="0 0 512 512"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="30px"
                                                            width="30px"
                                                        >
                                                            <title />
                                                            <g
                                                                data-name="1"
                                                                id="_1"
                                                                className="text-red-300"
                                                            >
                                                                <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" />
                                                                <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" />
                                                                <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" />
                                                            </g>
                                                        </svg>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {el?.foundationCoOwnerApproval ? (
                                                        <svg
                                                            viewBox="0 0 32 32"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="30px"
                                                            width="30px"
                                                        >
                                                            <defs></defs>
                                                            <title />
                                                            <g
                                                                data-name="Layer 28"
                                                                id="Layer_28"
                                                            >
                                                                <path
                                                                    className="cls-1"
                                                                    d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
                                                                />
                                                                <path
                                                                    className="cls-1"
                                                                    d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
                                                                />
                                                            </g>
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            viewBox="0 0 512 512"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="30px"
                                                            width="30px"
                                                        >
                                                            <title />
                                                            <g
                                                                data-name="1"
                                                                id="_1"
                                                                className="text-red-300"
                                                            >
                                                                <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" />
                                                                <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" />
                                                                <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" />
                                                            </g>
                                                        </svg>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {el?.isRequestWithdrawal
                                                        ? "Ongoing Request"
                                                        : "No Ongoing Request"}
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleWithdrawalApprove(
                                                                el
                                                            )
                                                        }
                                                        className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-xs font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out ${
                                                            el?.kindlinkApproval
                                                                ? "cursor-not-allowed opacity-50"
                                                                : ""
                                                        }`}
                                                        disabled={
                                                            !el?.kindlinkApproval
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

export default DevWithdrawalApproval;
