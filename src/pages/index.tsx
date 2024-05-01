import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <>
            {/* <div className="flex justify-center items-center bg-yellow-300"> */}
            {/* <div className="flex flex-col justify-center items-center max-w-[55%] text-center gap-5"> */}
            <div className="flex flex-col h-full justify-center items-center">
                <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 text-7xl font-bold italic text-center leading-[1.5] line-clamp-2">
                    A decentralized way to deliver kindness
                </h1>
                <p>
                    Kindlink is a transparent decentralized way for you to make
                    and track each and every one of your donations utizling
                    cutting edge blockchain technology
                </p>
                {/* </div> */}
                {/* </div> */}
            </div>
        </>
    );
}
