import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
    return (
        <>
            <div
                className="bg-cover bg-no-repeat bg-center h-screen"
                style={{
                    backgroundImage:
                        "url(https://img.freepik.com/free-photo/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-71068.jpg?t=st=1714527521~exp=1714531121~hmac=e053868b1162e44c8127535841802ca6b90b24e718cba95f4b8308a5d695c2ce&w=1800)",
                }}
            >
                <Navbar />
                <div className="flex justify-center h-full">
                    <div className="flex flex-col justify-center items-center max-w-[55%] text-center gap-5">
                        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-blue-500 text-7xl font-bold italic text-center leading-[1.5] line-clamp-2 text-white">
                            A decentralized way to deliver kindness
                        </h1>
                        <p>
                            Kindlink is a transparent decentralized way for you
                            to make and track each and every one of your
                            donations utizling cutting edge blockchain
                            technology
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-screen">
                <h1>test2</h1>
            </div>
        </>
    );
}
