import { kindlinkAbi } from "./kindlinkAbi";
import { publicClient } from "./client";
// import { walletClient } from "./wallet";
import { createWalletClient, custom, getContract } from "viem";
import { sepolia } from "viem/chains";

const contractAddress = "0xb239fBf9AF787C7e8783c76A73cAd2fc42b5118f";

export const addCandidate = async (
    foundationOwnerAddress: string,
    foundationCoOwnerAddress: string
) => {
    console.log(foundationOwnerAddress, "withdrawalAddress");
    console.log(foundationCoOwnerAddress, "coWithdrawalAddress");
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
            args: [foundationOwnerAddress, foundationCoOwnerAddress],
        });
        console.log(request);
        return request;
        // await walletClient.writeContract(request);
    } catch (error) {
        console.log(error);
    }
};

export const voteCandidate = async (
    voteInput: boolean,
    foundationOwnerAddress: string
) => {
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
            functionName: "vote",
            args: [voteInput, foundationOwnerAddress],
        });
        console.log(request);
    } catch (error) {
        console.log(error);
    }
};

export const approveCandidate = async (foundationOwnerAddress: string) => {
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
            functionName: "approveCandidate",
            args: [foundationOwnerAddress],
        });
        console.log(request);
    } catch (error) {
        console.log(error);
    }
};

export const donate = async (
    foundationAddress: string,
    donationValue: number
) => {
    try {
        const walletClient = createWalletClient({
            chain: sepolia,
            transport: custom(window.ethereum),
        });
        const bigintWei = BigInt(donationValue * 1e18);
        console.log(bigintWei);
        const [account] = await walletClient.getAddresses();
        const { request } = await publicClient.simulateContract({
            account,
            address: contractAddress,
            abi: kindlinkAbi,
            functionName: "donate",
            args: [foundationAddress],
            value: bigintWei,
        });
        console.log(request);
    } catch (error) {
        console.log(error);
    }
};

export const getAllCandidates = async (
    userAddress: string,
    foundationOwnerAddresses: string[]
) => {
    try {
        const contract = getContract({
            address: contractAddress,
            abi: kindlinkAbi,
            client: publicClient,
        });
        return await contract.read.getAllCandidates([
            userAddress,
            foundationOwnerAddresses,
        ]);
    } catch (error) {
        console.log(error);
    }
};
