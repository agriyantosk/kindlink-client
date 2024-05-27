import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [sepolia],
    ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                        <Layout>
                            <ToastContainer />
                            <Component {...pageProps} />
                        </Layout>
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </>
    );
}
