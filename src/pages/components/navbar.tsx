import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
    return (
        <>
            <header className="sticky inset-0 z-50 bg-transparent backdrop-blur-lg">
                <nav className="mx-auto flex justify-between max-w-6xl transition-all duration-200 ease-in-out py-4 border-b border-slate-400 items-center">
                    <div className="relative flex items-center w-64">
                        <ul className="hidden items-center justify-center md:flex">
                            <Link href={"/under-development"}>
                                <li className="font-dm text-sm font-medium text-blue-500 hover:bg-blue-500 rounded-lg px-2 py-1 hover:text-white ease-out transition-all duration-200">
                                    <p>About</p>
                                </li>
                            </Link>
                            <Link href={"/donate"}>
                                <li className="font-dm text-sm font-medium text-blue-500 hover:bg-blue-500 rounded-lg px-2 py-1 hover:text-white ease-out transition-all duration-200">
                                    <p>Donate</p>
                                </li>
                            </Link>
                            <Link href={"/under-development"}>
                                <li className="font-dm text-sm font-medium text-blue-500 hover:bg-blue-500 rounded-lg px-2 py-1 hover:text-white ease-out transition-all duration-200">
                                    <p>Activity</p>
                                </li>
                            </Link>
                            <Link href={"/vote"}>
                                <li className="font-dm text-sm font-medium text-blue-500 hover:bg-blue-500 rounded-lg px-2 py-1 hover:text-white ease-out transition-all duration-200">
                                    <p>Vote</p>
                                </li>
                            </Link>
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
                        {/* <Link href={"/under-development"}>
                            <button className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                                Connect Wallet
                            </button>
                        </Link> */}
                        <ConnectButton.Custom>
                            {({
                                account,
                                chain,
                                openAccountModal,
                                openChainModal,
                                openConnectModal,
                                authenticationStatus,
                                mounted,
                            }) => {
                                // Note: If your app doesn't use authentication, you
                                // can remove all 'authenticationStatus' checks
                                const ready =
                                    mounted &&
                                    authenticationStatus !== "loading";
                                const connected =
                                    ready &&
                                    account &&
                                    chain &&
                                    (!authenticationStatus ||
                                        authenticationStatus ===
                                            "authenticated");

                                return (
                                    <div
                                        {...(!ready && {
                                            "aria-hidden": true,
                                            style: {
                                                opacity: 0,
                                                pointerEvents: "none",
                                                userSelect: "none",
                                            },
                                        })}
                                    >
                                        {(() => {
                                            if (!connected) {
                                                return (
                                                    <button
                                                        onClick={
                                                            openConnectModal
                                                        }
                                                        type="button"
                                                        className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                                                    >
                                                        Connect Wallet
                                                    </button>
                                                );
                                            }

                                            if (chain.unsupported) {
                                                return (
                                                    <button
                                                        onClick={openChainModal}
                                                        type="button"
                                                    >
                                                        Wrong network
                                                    </button>
                                                );
                                            }

                                            return (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 12,
                                                    }}
                                                    className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                                                >
                                                    <button
                                                        onClick={openChainModal}
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                        type="button"
                                                    >
                                                        {chain.hasIcon && (
                                                            <div
                                                                style={{
                                                                    background:
                                                                        chain.iconBackground,
                                                                    width: 12,
                                                                    height: 12,
                                                                    borderRadius: 999,
                                                                    overflow:
                                                                        "hidden",
                                                                    marginRight: 4,
                                                                }}
                                                            >
                                                                {chain.iconUrl && (
                                                                    <img
                                                                        alt={
                                                                            chain.name ??
                                                                            "Chain icon"
                                                                        }
                                                                        src={
                                                                            chain.iconUrl
                                                                        }
                                                                        style={{
                                                                            width: 12,
                                                                            height: 12,
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
                                                        {chain.name}
                                                    </button>

                                                    <button
                                                        onClick={
                                                            openAccountModal
                                                        }
                                                        type="button"
                                                    >
                                                        {account.displayName}
                                                        {account.displayBalance
                                                            ? ` (${account.displayBalance})`
                                                            : ""}
                                                    </button>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
