import Image from "next/image";
import Navbar from "./components/Navbar";
import { useAccount } from "wagmi";

export default function Home() {
    const { isConnected, address } = useAccount();
    return (
        <>
            <div className="flex flex-col h-full justify-center items-center">
                <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 text-7xl font-bold italic text-center leading-[1.5] line-clamp-2">
                    A decentralized way to deliver kindness
                </h1>
                <p className="text-center w-[50%]">
                    Kindlink is a transparent decentralized way for you to make
                    and track each and every one of your donations utizling
                    cutting edge blockchain technology
                </p>
                <p>Status: {JSON.stringify(isConnected)}</p>
                <p>Address: {JSON.stringify(address)}</p>
            </div>
        </>
    );
}
