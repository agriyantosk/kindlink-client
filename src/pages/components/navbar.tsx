import Link from "next/link";
import { useAccount } from "wagmi";
import { fetchFirebaseWallets } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { DevEnum, OwnerEnum } from "@/enum/enum";
import { usePathname } from "next/navigation";
import ConnectButtonComponent from "./ConnectButton";

const Navbar = () => {
    const { address, isConnected } = useAccount();
    const [isOwner, setIsOwner] = useState();
    const [isDev, setIsDev] = useState();
    const pathname = usePathname();

    const checkOwnerAddress = async (userAddress: string) => {
        try {
            const ownerAddress = await fetchFirebaseWallets(
                OwnerEnum.CollectionName,
                process.env.NEXT_PUBLIC_OWNER_DOCUMENTID as string,
                OwnerEnum.KeyName
            );
            const check =
                ownerAddress &&
                ownerAddress.find((el: any) => el === userAddress);
            setIsOwner(check);
        } catch (error) {
            console.log(error);
        }
    };

    const checkDevAddress = async (userAddress: string) => {
        try {
            const devAddress = await fetchFirebaseWallets(
                DevEnum.CollectionName,
                process.env.NEXT_PUBLIC_DEV_DOCUMENTID as string,
                DevEnum.KeyName
            );
            const check =
                devAddress && devAddress.find((el: any) => el === userAddress);
            setIsDev(check);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (address) {
            checkOwnerAddress(address);
            checkDevAddress(address);
        }
    }, [address]);

    return (
        <>
            <header className="sticky top-0 z-50 bg-transparent backdrop-blur-lg w-full">
                <nav className="mx-auto flex justify-between max-w-6xl transition-all duration-200 ease-in-out py-4 border-b border-slate-400 items-center">
                    <div className="relative flex items-center w-64">
                        <ul className="hidden items-center justify-center md:flex">
                            <Link href={"/donate"}>
                                <li
                                    className={`font-dm text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg px-2 py-1 ease-out transition-all duration-200 ${
                                        pathname === "/donate"
                                            ? "text-white bg-blue-500"
                                            : ""
                                    }`}
                                >
                                    <p>Donate</p>
                                </li>
                            </Link>
                            <Link href={"/activity"}>
                                <li
                                    className={`font-dm text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg px-2 py-1 ease-out transition-all duration-200 ${
                                        pathname === "/activity"
                                            ? "text-white bg-blue-500"
                                            : ""
                                    }`}
                                >
                                    <p>Activity</p>
                                </li>
                            </Link>
                            <Link href={"/vote"}>
                                <li
                                    className={`font-dm text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg px-2 py-1 ease-out transition-all duration-200 ${
                                        pathname === "/vote"
                                            ? "text-white bg-blue-500"
                                            : ""
                                    }`}
                                >
                                    <p>Vote</p>
                                </li>
                            </Link>
                            {isConnected && address && isDev ? (
                                <Link href={"/dev"}>
                                    <li className="font-dm text-sm font-medium text-red-500 hover:bg-red-500 rounded-lg px-2 py-1 hover:text-white ease-out transition-all duration-200">
                                        <p>Dev</p>
                                    </li>
                                </Link>
                            ) : (
                                <></>
                            )}
                            {isConnected && address && isOwner ? (
                                <Link href={"/withdrawal"}>
                                    <li className="font-dm text-sm font-medium text-red-500 hover:bg-red-500 rounded-lg px-2 py-1 hover:text-white ease-out transition-all duration-200">
                                        <p>Withdrawal</p>
                                    </li>
                                </Link>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link href={"/"}>
                            <h1 className="font-bold text-4xl text-blue-500">
                                KINDLINK
                            </h1>
                        </Link>
                    </div>
                    <div className="items-center justify-end gap-6">
                        <ConnectButtonComponent />
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
