import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
    FaRegCircleCheck,
    FaRegCircleXmark,
    FaRegCircleUp,
    FaRegCircleDown,
} from "react-icons/fa6";
import { LiaDonateSolid } from "react-icons/lia";
import { MdOutlineHowToVote, MdOutlineRequestPage } from "react-icons/md";
import { MdApproval } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";

const EventCard = ({ event, key }: { event: any; key: number }) => {
    const constructIcon = () => {
        switch (event?.eventName) {
            case "AddCandidates":
                return <IoPersonAddOutline />;
            case "Vote":
                return <MdOutlineHowToVote />;
            case "WithdrawalRequest":
                return <MdOutlineRequestPage />;
            case "WinsVote":
                return <FaRegCircleCheck />;
            case "LoseVote":
                return <FaRegCircleXmark />;
            case "Donate":
                return <LiaDonateSolid />;
            case "Withdrawal":
                return <BiMoneyWithdraw />;
            case "ApproveWithdrawal":
                return <MdApproval />;
            default:
                break;
        }
    };
    const constructEvent = () => {
        switch (event?.eventName) {
            case "AddCandidates":
                return (
                    <>
                        <div>
                            <h3>From: {event && event?.args?.from}</h3>
                            <h3>
                                Foundation Owner Address:{" "}
                                <a
                                    className="hover:underline hover:cursor-pointer"
                                    href={`http://sepolia.etherscan.io/address/${
                                        event &&
                                        event?.args?.foundationOwnerAddress
                                    }`}
                                    target="_blank"
                                >
                                    {event &&
                                        event?.args?.foundationOwnerAddress}
                                </a>
                            </h3>
                        </div>
                    </>
                );
            case "Vote":
                return (
                    <>
                        <div>
                            <h3>From: {event && event?.args?.from}</h3>
                            <h3>
                                Candidate Owner Address:{" "}
                                <a
                                    className="hover:underline hover:cursor-pointer"
                                    href={`http://sepolia.etherscan.io/address/${
                                        event &&
                                        event?.args?.candidateOwnerAddress
                                    }`}
                                    target="_blank"
                                >
                                    {event &&
                                        event?.args?.candidateOwnerAddress}
                                </a>
                            </h3>
                            <h3 className="flex gap-2 items-center">
                                Vote:
                                <span>
                                    {event && event?.args?.vote ? (
                                        <FaRegCircleUp className="text-green-300 font-bold text-xl" />
                                    ) : (
                                        <FaRegCircleDown className="text-red-300 font-bold text-xl" />
                                    )}
                                </span>
                            </h3>
                        </div>
                    </>
                );
            case "WithdrawalRequest":
                return (
                    <>
                        <div>
                            <h3>From: {event && event?.args?.from}</h3>
                            <h3>
                                Foundation Contract Addreses:{" "}
                                <a
                                    className="hover:underline hover:cursor-pointer"
                                    href={`http://sepolia.etherscan.io/address/${
                                        event && event?.args?.contractAddress
                                    }`}
                                    target="_blank"
                                >
                                    {event && event?.args?.contractAddress}
                                </a>
                            </h3>
                        </div>
                    </>
                );
            case "WinsVote":
                return (
                    <>
                        <div>
                            <h3>
                                Winning Foundation Contract Addreses:{" "}
                                <a
                                    className="hover:underline hover:cursor-pointer"
                                    href={`http://sepolia.etherscan.io/address/${
                                        event && event?.args?.contractAddress
                                    }`}
                                    target="_blank"
                                >
                                    {event && event?.args?.contractAddress}
                                </a>
                            </h3>
                        </div>
                    </>
                );
            case "LoseVote":
                return (
                    <>
                        <div>
                            <h3>
                                Losing Candidate Owner Address:{" "}
                                <a
                                    className="hover:underline hover:cursor-pointer"
                                    href={`http://sepolia.etherscan.io/address/${
                                        event &&
                                        event?.args?.foundationOwnerAddress
                                    }`}
                                    target="_blank"
                                >
                                    {event &&
                                        event?.args?.foundationOwnerAddress}
                                </a>
                            </h3>
                        </div>
                    </>
                );
            case "Donate":
                return (
                    <>
                        <div>
                            <h3>From: {event && event?.args?.from}</h3>
                            <h3>
                                Foundation Contract Addreses:{" "}
                                <a
                                    className="hover:underline hover:cursor-pointer"
                                    href={`http://sepolia.etherscan.io/address/${
                                        event && event?.args?.contractAddress
                                    }`}
                                    target="_blank"
                                >
                                    {event && event?.args?.contractAddress}
                                </a>
                            </h3>
                            <h3>
                                Value:{" "}
                                {event && Number(event?.args?.value) / 1e18} ETH
                            </h3>
                        </div>
                    </>
                );
            case "Withdrawal":
                return (
                    <>
                        <div>
                            <h3>From: {event && event?.args?.from}</h3>
                            <h3>
                                Foundation Contract Addreses:{" "}
                                <a
                                    className="hover:underline hover:cursor-pointer"
                                    href={`http://sepolia.etherscan.io/address/${
                                        event && event?.args?.contractAddress
                                    }`}
                                    target="_blank"
                                >
                                    {event && event?.args?.contractAddress}
                                </a>
                            </h3>
                            <h3>
                                Value:{" "}
                                {event && Number(event?.args?.value) / 1e18} ETH
                            </h3>
                        </div>
                    </>
                );
            case "ApproveWithdrawal":
                return (
                    <>
                        <div>
                            <h3>From: {event && event?.args?.from}</h3>
                            <h3>
                                Foundation Contract Addreses:{" "}
                                <a
                                    className="hover:underline hover:cursor-pointer"
                                    href={`http://sepolia.etherscan.io/address/${
                                        event && event?.args?.contractAddress
                                    }`}
                                    target="_blank"
                                >
                                    {event && event?.args?.contractAddress}
                                </a>
                            </h3>
                        </div>
                    </>
                );
            default:
                break;
        }
    };
    return (
        <>
            <div className="w-[65%]" key={key}>
                <VerticalTimeline layout="1-column-left">
                    <VerticalTimelineElement
                        contentStyle={{
                            background: "rgb(33, 150, 243)",
                            color: "#fff",
                        }}
                        contentArrowStyle={{
                            borderRight: "7px solid  rgb(33, 150, 243)",
                        }}
                        iconStyle={{
                            background: "rgb(33, 150, 243)",
                            color: "#fff",
                        }}
                        icon={constructIcon()}
                    >
                        <div className="flex flex-col gap-5">
                            <h3 className="font-bold text-2xl">
                                {event?.eventName}
                            </h3>
                            {event ? (
                                constructEvent()
                            ) : (
                                <>
                                    <h1>No Events</h1>
                                </>
                            )}
                        </div>
                        <p className="text-4xl text-gray-200">
                            Transaction Hash:{" "}
                            <a
                                href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                                target="_blank"
                            >
                                <span className="hover:underline hover:cursor-pointer">
                                    {event.transactionHash}
                                </span>
                            </a>
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </>
    );
};

export default EventCard;
