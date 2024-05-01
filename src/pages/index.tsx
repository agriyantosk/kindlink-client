import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
    return (
        <>
            <div className="bg-cover bg-no-repeat bg-center h-screen">
                <Navbar />
                <div className="flex justify-center h-full">
                    <div className="flex flex-col justify-center items-center max-w-[55%] text-center gap-5">
                        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 text-7xl font-bold italic text-center leading-[1.5] line-clamp-2">
                            A decentralized way to deliver kindness
                        </h1>
                        <p>
                            Kindlink is a transparent decentralized way for you
                            to make and track each and every one of your
                            donations utizling cutting edge blockchain
                            technology
                        </p>
                        <button></button>
                    </div>
                </div>
            </div>
        </>
    );
}
