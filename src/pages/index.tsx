import { KindlinkEnum } from "@/enum/enum";
import CurvedStepper from "./components/CurvedStepper";

export default function Home() {
    return (
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-col justify-center h-screen items-center gap-10">
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r w-[50%] from-blue-300 to-blue-500 text-7xl font-bold italic text-center leading-[1.3] line-clamp-2">
                        A decentralized way to deliver kindness
                    </h1>
                    <p className="text-center w-[50%] text-xl">
                        Kindlink is a transparent decentralized way for you to
                        make and track each and every one of your donations
                        utizling cutting edge blockchain technology
                    </p>
                    <p>Smart Contract: {KindlinkEnum.contractAddress}</p>
                </div>
                <div className="h-screen">
                    <CurvedStepper />
                </div>
            </div>
        </>
    );
}
