import { fetchData } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Foundations = () => {
    const [contracts, setContracts] = useState<any>();
    const dummyAddress = "0xuserwalletaddress1";
    const { address } = useAccount();
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
        return null; // No associated contract found for the user
    }
    const fetchContract = async () => {
        try {
            const data = await fetchData("deployedFoundations");
            const parsed = JSON.parse(data[0].contracts);
            const foundationContract = findContractAddressForUser(
                dummyAddress as string,
                parsed
            );
            setContracts(foundationContract);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchContract();
    }, []);
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
                <h1>{JSON.stringify(contracts)}</h1>
            </div>
        </>
    );
};

export default Foundations;

// const contractDetails = {
//     '0xcontractaddress1': {
//         withdrawalAddress: '0xuserwalletaddress1',
//         coWithdrawalAddress: '0xuserwalletaddress2'
//     },
//     // Add more contract details as needed
// };

// // Function to find contract address associated with a user's wallet address
// function findContractAddressForUser(userWalletAddress) {
//     for (const contractAddress in contractDetails) {
//         const details = contractDetails[contractAddress];
//         if (details.withdrawalAddress === userWalletAddress || details.coWithdrawalAddress === userWalletAddress) {
//             return contractAddress;
//         }
//     }
//     return null; // No associated contract found for the user
// }
