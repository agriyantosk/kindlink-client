import { kindlinkAbi } from "@/utils/ABI";
import { publicClient } from "@/utils/client";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { KindlinkEnum } from "@/enum/enum";

const Activity = () => {
    const [events, setEvents] = useState<any>([]);
    const getContractEvents = async () => {
        try {
            const item = await publicClient.getContractEvents({
                address: KindlinkEnum.contractAddress,
                abi: kindlinkAbi,
                fromBlock: BigInt(0),
            });
            setEvents(item);
        } catch (error) {
            console.log(error);
        }
    };
    // const watchContractEvents = async () => {
    //     try {
    //         await publicClient.watchEvent({
    //             address: KindlinkEnum.contractAddress,
    //             onLogs: (logs) => {
    //                 console.log(logs, "new logs");
    //                 setEvents((prevEvents: any) => [...prevEvents, ...logs]);
    //             },
    //         });
    //     } catch (error) {
    //         console.error("Error watching events:", error);
    //     }
    // };

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         watchContractEvents();
    //     }, 3000);

    //     return () => clearInterval(intervalId);
    // }, []);

    useEffect(() => {
        getContractEvents();
    }, []);

    return (
        <>
            <div className="text-black mt-10 w-full flex flex-col items-center">
                {events &&
                    events.map((el: any, index: number) => {
                        return <EventCard event={el} key={index} />;
                    })}
            </div>
        </>
    );
};

export default Activity;
