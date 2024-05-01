import Link from "next/link";

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
                            <Link href={"/under-development"}>
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
                    <div className="hidden items-center justify-end gap-6 md:flex w-64">
                        <Link href={"/under-development"}>
                            <button className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                                Connect Wallet
                            </button>
                        </Link>
                    </div>
                    {/* <div className="relative flex items-center justify-center md:hidden">
                        <button type="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="h-6 w-auto text-slate-900"
                            >
                                <path
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                ></path>
                            </svg>
                        </button>
                    </div> */}
                </nav>
            </header>
        </>
    );
};

export default Navbar;
