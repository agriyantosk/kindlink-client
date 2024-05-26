import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

console.log(process.env.NEXT_PUBLIC_SEPOLIA_API_URL);

export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(process.env.NEXT_PUBLIC_SEPOLIA_API_URL),
});
