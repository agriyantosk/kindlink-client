import {
    firebaseTimestampToDate,
    votingPeriodCompare,
} from "@/utils/utilsFunction";

const DevVoteTable = ({ filterOption, candidates }: any) => {
    return (
        <>
            <div className="relative overflow-y-auto w-full px-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Project Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Yes Votes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No Votes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                End Voting Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    {candidates &&
                        candidates.map((el: any, index: number) => {
                            return (
                                <>
                                    <tbody key={index}>
                                        <tr className="border-b border-gray-400">
                                            <td
                                                scope="row"
                                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                                            >
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={el?.imgUrl}
                                                    alt="Foundation Logo"
                                                />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">
                                                        {el?.name}
                                                    </div>
                                                    <div className="font-normal text-gray-500">
                                                        Category
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {el?.yesVotes}
                                            </td>
                                            <td className="px-6 py-4">
                                                {el?.noVotes}
                                            </td>
                                            <td className="px-6 py-4">
                                                <h1 className="font-bold">
                                                    {`${
                                                        firebaseTimestampToDate(
                                                            el.createdAt
                                                        ).formattedDate
                                                    } `}
                                                    <span className="font-normal">
                                                        (
                                                        {
                                                            firebaseTimestampToDate(
                                                                el.createdAt
                                                            ).formattedTime
                                                        }
                                                        )
                                                    </span>
                                                </h1>
                                            </td>
                                            <td className="px-6 py-4">
                                                {votingPeriodCompare(
                                                    el?.endVotingTime
                                                )
                                                    ? "Ongoing"
                                                    : "Ended"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    type="button"
                                                    className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 font-dm text-xs font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] ${
                                                        !votingPeriodCompare(
                                                            el?.endVotingTime
                                                        )
                                                            ? "cursor-not-allowed opacity-50"
                                                            : ""
                                                    }`}
                                                    disabled={
                                                        !votingPeriodCompare(
                                                            el?.endVotingTime
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </>
                            );
                        })}
                </table>
            </div>
        </>
    );
};

export default DevVoteTable;
