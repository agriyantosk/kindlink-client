import { fetchData } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Foundations = () => {
    const [contractAddress, setContractAddress] = useState<any>();
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
