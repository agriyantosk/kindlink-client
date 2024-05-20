import { kindlinkAbi } from "./ABI";
import { publicClient } from "./client";
// import { walletClient } from "./wallet";
import { createWalletClient, custom, getContract, isAddress } from "viem";
import { sepolia } from "viem/chains";

const contractAddress = "0xC4CDaC2f39823CDCAc91009412b6bfe6C395472A";

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
        console.log(request);
        const executeAddCandidate = await walletClient.writeContract(request);
        if (executeAddCandidate) {
            const transaction = await publicClient.waitForTransactionReceipt({
                hash: executeAddCandidate,
            });
            return transaction.status;
        }
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
        const executeVote = await walletClient.writeContract(request);
        // if (executeVote) {
        //     const transaction = await publicClient.waitForTransactionReceipt({
        //         hash: executeVote,
        //     });
        //     return { status: transaction.status, txHash: executeVote };
        // }
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
        console.log(request);
        const executeApproveCandidate = await walletClient.writeContract(
            request
        );
        console.log("berhasil writecontract");
        if (executeApproveCandidate) {
            const transaction = await publicClient.waitForTransactionReceipt({
                hash: executeApproveCandidate,
            });
            console.log("berhasil dapetin receipt");
            return transaction.status;
        }
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
        if (executeDonation) {
            const transaction = await publicClient.waitForTransactionReceipt({
                hash: executeDonation,
            });
            return transaction.status;
        }
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
        if (executeWithdrawal) {
            const transaction = await publicClient.waitForTransactionReceipt({
                hash: executeWithdrawal,
            });
            return transaction.status;
        }
        return true;
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
        if (executeWithdrawalRequest) {
            const transaction = await publicClient.waitForTransactionReceipt({
                hash: executeWithdrawalRequest,
            });
            return transaction.status;
        }
        return true;
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
        if (executeWithdrawalRequest) {
            const transaction = await publicClient.waitForTransactionReceipt({
                hash: executeWithdrawalRequest,
            });
            return transaction.status;
        }
        return true;
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
