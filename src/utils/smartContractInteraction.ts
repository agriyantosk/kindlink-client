import { KindlinkEnum } from "@/enum/enum";
import { kindlinkAbi } from "./ABI";
import { publicClient } from "./client";
import { createWalletClient, custom, getContract } from "viem";
import { sepolia } from "viem/chains";

const contractAddress = KindlinkEnum.contractAddress;

// CALL MAIN KINDLINK FUNCTION
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
        const executeAddCandidate = await walletClient.writeContract(request);
        return executeAddCandidate;
    } catch (error) {
        throw error;
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
        const executeVote = await walletClient.writeContract(request);
        return executeVote;
    } catch (error) {
        throw error;
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
        const executeApproveCandidate = await walletClient.writeContract(
            request
        );
        return executeApproveCandidate;
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
    } catch (error) {
        console.log(error);
    }
};

// KINDLINK DELEGATE FUNCTION
export const withdrawal = async (foundationAddress: string) => {
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
            functionName: "delegateWithdrawal",
            args: [foundationAddress],
        });
        const executeWithdrawal = await walletClient.writeContract(request);
        return executeWithdrawal;
    } catch (error) {
        console.log(error);
    }
};

export const foundationWithdrawalRequest = async (
    foundationAddress: string
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
            functionName: "delegateWithdrawalRequest",
            args: [foundationAddress],
        });
        const executeWithdrawalRequest = await walletClient.writeContract(
            request
        );
        return executeWithdrawalRequest;
    } catch (error) {
        console.log(error);
    }
};

export const foundationWithdrawalApprove = async (
    foundationAddress: string
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
            functionName: "delegateApprove",
            args: [foundationAddress],
        });
        const executeWithdrawalRequest = await walletClient.writeContract(
            request
        );
        return executeWithdrawalRequest;
    } catch (error) {
        console.log(error);
    }
};

// GETTER FUNCTION
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
