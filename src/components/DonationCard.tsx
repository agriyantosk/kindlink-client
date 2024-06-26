import { publicClient } from "@/utils/client";
import { convertTimestamp } from "@/utils/utilsFunction";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DonationData {}

const DonationCard = ({ foundations }: any) => {
    const [balances, setBalances] = useState<number[]>([]);

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                if (foundations) {
                    const promises = foundations.map((el: any) =>
                        getContractBalance(el.contractAddress)
                    );
                    const balances = await Promise.all(promises);
                    setBalances(balances);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchBalances();
    }, [foundations]);

    const getContractBalance = async (contractAddress: `0x${string}`) => {
        try {
            const balance = await publicClient.getBalance({
                address: contractAddress,
            });
            return `${Number(balance) / 1e18} ETH`;
        } catch (error) {
            console.log(error);
            return "Error getting raised funds";
        }
    };

    return (
        <>
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-transparent border-b border-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Project Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fund Raised
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Involved Participants
                            </th>
                            <th scope="col" className="px-6 py-3">
                                End Voting Time
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    {foundations &&
                        foundations.map((el: any, index: number) => {
                            return (
                                <>
                                    <tbody key={index} className="text-center">
                                        <tr className="border-b border-gray-700 bg-transparent">
                                            <td
                                                scope="row"
                                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={el.imgUrl}
                                                    alt="Foundation Logo"
                                                />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">
                                                        {el.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {balances[index]}
                                            </td>
                                            <td className="px-6 py-4">
                                                <h1>
                                                    {Number(
                                                        el.involvedParticipants
                                                    )}
                                                </h1>
                                            </td>
                                            <td className="px-6 py-4">
                                                <h1 className="font-bold">
                                                    {`${convertTimestamp(
                                                        Number(el.endVotingTime)
                                                    )} `}
                                                    {/* <span className="font-normal">
                                                        (
                                                        {
                                                            firebaseTimestampToDate(
                                                                el.createdAt
                                                            ).formattedTime
                                                        }
                                                        )
                                                    </span> */}
                                                </h1>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={`/donate/${el.contractAddress}`}
                                                >
                                                    <button className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                                                        View
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </>
                            );
                        })}
                </table>
            </div>
        </>
    );
};

export default DonationCard;
