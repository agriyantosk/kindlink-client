import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";

export const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!),
});
