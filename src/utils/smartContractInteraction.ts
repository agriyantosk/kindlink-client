import { kindlinkAbi } from "./kindlinkAbi";
import { publicClient } from "./client";
// import { walletClient } from "./wallet";
import { createWalletClient, custom, getContract, isAddress } from "viem";
import { sepolia } from "viem/chains";

const contractAddress = "0xB7Cf6ccE6E0E3a6806972b82aD9Cb2f59A6ca580";

export const addCandidate = async (
    foundationOwnerAddress: string,
    foundationCoOwnerAddress: string
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
        return true;
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
    userAddress: string | `0x${string}` | undefined,
    foundationOwnerAddresses: [`0x${string}`]
) => {
    try {
        if (
            userAddress !== undefined &&
            foundationOwnerAddresses !== undefined
        ) {
            const contract = getContract({
                address: contractAddress,
                abi: kindlinkAbi,
                client: publicClient,
            });
            const candidates = await contract.read.getAllCandidatesWithVotes([
                userAddress,
                foundationOwnerAddresses,
            ]);
            return candidates;
        }
    } catch (error) {
        console.log(error);
    }
};
