import { kindlinkAbi } from "./ABI";
import { publicClient } from "./client";
// import { walletClient } from "./wallet";
import { createWalletClient, custom, getContract, isAddress } from "viem";
import { sepolia } from "viem/chains";

const contractAddress = "0x33Be2e3b3DB31056d6FBD752ef7b062Bc74911B0";

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
        const vote = await walletClient.writeContract(request);
        return vote;
    } catch (error) {
        return error;
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
        console.log(foundationAddress);
        const walletClient = createWalletClient({
            chain: sepolia,
            transport: custom(window.ethereum),
        });
        const bigintWei = BigInt(donationValue * 1e18);
        const [account] = await walletClient.getAddresses();
        const { request } = await publicClient.simulateContract({
            account,
            address: contractAddress,
            abi: kindlinkAbi,
            functionName: "donate",
            args: [foundationAddress],
            value: bigintWei,
        });
        const executeDonation = await walletClient.writeContract(request);
        return executeDonation;
        // const transaction = await publicClient.waitForTransactionReceipt({
        //     hash: executeDonation,
        // });
        // console.log(transaction);
        // return transaction.status;
        // 0xada0401c840269867d175841ac1f5d71b23a5142e0ca3c598717d7d85ffc9f5c
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

export const getAllListedFoundation = async (
    foundationContractAddress: [`0x${string}`]
) => {
    try {
        const contract = getContract({
            address: contractAddress,
            abi: kindlinkAbi,
            client: publicClient,
        });
        const foundations = await contract.read.getAllFoundationEndVoteTime([
            foundationContractAddress,
        ]);
        return foundations;
    } catch (error) {
        console.log(error);
    }
};
