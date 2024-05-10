import { kindlinkAbi } from "./kindlinkAbi";
import { publicClient } from "./client";
// import { walletClient } from "./wallet";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";

const contractAddress = "0xb239fBf9AF787C7e8783c76A73cAd2fc42b5118f";

export const addCandidate = async (
    withdrawalAddress: string,
    coWithdrawalAddress: string
) => {
    console.log(withdrawalAddress, "withdrawalAddress");
    console.log(coWithdrawalAddress, "coWithdrawalAddress");
    try {
        const walletClient = createWalletClient({
            chain: sepolia,
            transport: custom(window.ethereum),
        });
        const [account] = await walletClient.getAddresses();
        const { request } = await publicClient.simulateContract({
            account,
            address: contractAddress,
            abi: kindlinkAbi,
            functionName: "addCandidates",
            args: [withdrawalAddress, coWithdrawalAddress],
        });
        console.log(request);
        return request;
        // await walletClient.writeContract(request);
    } catch (error) {
        console.log(error);
    }
};
