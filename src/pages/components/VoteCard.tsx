import { Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useCandidateDetail, useModal } from "./Layout";
import {
    convertTimestampToDateString,
    extractErrorMessage,
    formatRemainingTime,
} from "@/utils/utilsFunction";
import { voteCandidate } from "@/utils/smartContractInteraction";
import { toast } from "react-toastify";

const VoteCard = ({ candidates, refetch }: any) => {
    const [countdown, setCountdown] = useState([]);
    const { setShowModal } = useModal();
    const { setCandidateDetail } = useCandidateDetail();

    const handleShowModal: any = (candidateIndex: number) => {
        setShowModal(true);
        setCandidateDetail(candidates[candidateIndex]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedCountdown = candidates.map((candidate: any) => {
                const endTime = new Date(
                    Number(candidate.endVotingTime)
                ).getTime();
                const remainingTime = endTime * 1000 - Date.now();
                return {
                    id: candidate.id,
                    remainingTime: remainingTime > 0 ? remainingTime : 0,
                };
            });
            setCountdown(updatedCountdown);
        }, 1000);

        return () => clearInterval(interval);
    }, [candidates]);

    const handleVote = async (
        voteInput: boolean,
        foundationOwnerAddress: string
    ) => {
        let hash: string;
        const toastId = toast.loading("Writing Smart Contract");
        try {
            const vote = await voteCandidate(voteInput, foundationOwnerAddress);
            if (vote) {
                hash = vote;
                toast.success(
                    ({ closeToast }) => (
                        <div className="custom-toast">
                            <a
                                href={`https://sepolia.etherscan.io/address/${hash}`}
                            >
                                {`https://sepolia.etherscan.io/address/${hash}`}
                            </a>
                        </div>
                    ),
                    {
                        autoClose: false,
                    }
                );
                toast.dismiss(toastId);
            }
            await refetch();
        } catch (error: any) {
            const errorMessage = error?.shortMessage;
            const extractedMessage = extractErrorMessage(errorMessage);
            toast.error(extractedMessage);
            toast.dismiss(toastId);
        }
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {candidates
                    ? candidates.map((el: any, index: number) => {
                          return (
                              <>
                                  <div
                                      className="w-full bg-white h-full mt-10 border border-gray-700 rounded-lg"
                                      key={index}
                                  >
                                      <img
                                          className="object-cover h-32 w-full rounded-lg"
                                          src={el.imgUrl}
                                          alt="Foundation Logo"
                                      />
                                      <div className="flex flex-col gap-5 p-3 justify-between">
                                          <div className="flex flex-col gap-1">
                                              <h1 className="font-bold text-2xl">
                                                  {el.name}
                                              </h1>
                                              <p className="line-clamp-2 text-sm">
                                                  {el.description}
                                              </p>
                                              <button
                                                  onClick={() =>
                                                      handleShowModal(index)
                                                  }
                                                  className="text-blue-400 underline hover:text-blue-400 text-sm text-left"
                                              >
                                                  See More...
                                              </button>
                                          </div>
                                          <div className="w-full border flex border-gray-700 rounded-xl p-5">
                                              <div className="w-full">
                                                  <div className="text-sm">
                                                      {convertTimestampToDateString(
                                                          el.endVotingTime
                                                      ) > Date.now() ? (
                                                          <>
                                                              <div className="flex gap-2 items-center">
                                                                  <div className="rounded-full bg-green-400 border-2 border-gray-100 h-3 w-3"></div>
                                                                  <h1>
                                                                      LIVE NOW
                                                                  </h1>
                                                              </div>
                                                              <h1>
                                                                  {countdown[
                                                                      index
                                                                  ] ? (
                                                                      formatRemainingTime(
                                                                          countdown[
                                                                              index
                                                                          ]
                                                                      )
                                                                  ) : (
                                                                      <Skeleton
                                                                          className="w-full"
                                                                          count={
                                                                              1
                                                                          }
                                                                      />
                                                                  )}
                                                              </h1>
                                                          </>
                                                      ) : (
                                                          "Voting has ended"
                                                      )}
                                                  </div>
                                              </div>
                                              <div className="w-full text-right text-sm">
                                                  <h1>Voted Participants</h1>
                                                  <h1 className="italic font-bold">
                                                      {Number(el.yesVotes) +
                                                          Number(el.noVotes)}
                                                  </h1>
                                              </div>
                                          </div>
                                          <Progress
                                              className="bg-red-500"
                                              progress={Math.floor(
                                                  (Number(el.yesVotes) /
                                                      (Number(el.yesVotes) +
                                                          Number(el.noVotes))) *
                                                      100 +
                                                      0.5
                                              )}
                                              progressLabelPosition="inside"
                                              color="green"
                                              textLabel="Vote Count"
                                              textLabelPosition="outside"
                                              size="lg"
                                              labelProgress
                                              labelText
                                          />
                                          <div className="flex gap-5">
                                              <button
                                                  disabled={el.hasVoted}
                                                  onClick={() =>
                                                      handleVote(
                                                          true,
                                                          el.foundationOwnerAddress
                                                      )
                                                  }
                                                  className={`rounded-xl w-full flex items-center justify-center bg-gradient-to-br from-green-400 to-green-500 px-3 py-1.5 text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] ${
                                                      el.hasVoted
                                                          ? "cursor-not-allowed opacity-50"
                                                          : ""
                                                  }`}
                                              >
                                                  <svg
                                                      height="20px"
                                                      version="1.1"
                                                      viewBox="0 0 22 20"
                                                      width="22px"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      //   xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                                                      //   xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  >
                                                      <title />
                                                      <desc />
                                                      <defs />
                                                      <g
                                                          fill="none"
                                                          fill-rule="evenodd"
                                                          id="Page-1"
                                                          stroke="none"
                                                          stroke-width="1"
                                                      >
                                                          <g
                                                              fill="#FFFFFF"
                                                              id="Core"
                                                              transform="translate(-295.000000, -464.000000)"
                                                          >
                                                              <g
                                                                  id="thumb-up"
                                                                  transform="translate(295.000000, 464.000000)"
                                                              >
                                                                  <path
                                                                      d="M0,20 L4,20 L4,8 L0,8 L0,20 L0,20 Z M22,9 C22,7.9 21.1,7 20,7 L13.7,7 L14.7,2.4 L14.7,2.1 C14.7,1.7 14.5,1.3 14.3,1 L13.2,0 L6.6,6.6 C6.2,6.9 6,7.4 6,8 L6,18 C6,19.1 6.9,20 8,20 L17,20 C17.8,20 18.5,19.5 18.8,18.8 L21.8,11.7 C21.9,11.5 21.9,11.2 21.9,11 L21.9,9 L22,9 C22,9.1 22,9 22,9 L22,9 Z"
                                                                      id="Shape"
                                                                  />
                                                              </g>
                                                          </g>
                                                      </g>
                                                  </svg>
                                              </button>
                                              <button
                                                  disabled={el.hasVoted}
                                                  onClick={() =>
                                                      handleVote(
                                                          false,
                                                          el.foundationOwnerAddress
                                                      )
                                                  }
                                                  className={`rounded-xl w-full flex items-center justify-center bg-gradient-to-br from-red-400 to-red-500 px-3 py-1.5 text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] ${
                                                      el.hasVoted
                                                          ? "cursor-not-allowed opacity-50"
                                                          : ""
                                                  }`}
                                              >
                                                  <svg
                                                      height="20px"
                                                      version="1.1"
                                                      viewBox="0 0 22 20"
                                                      width="22px"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                      <title />
                                                      <desc />
                                                      <defs />
                                                      <g
                                                          fill="none"
                                                          fill-rule="evenodd"
                                                          id="Page-1"
                                                          stroke="none"
                                                          stroke-width="1"
                                                      >
                                                          <g
                                                              fill="#FFFFFF"
                                                              id="Core"
                                                              transform="translate(-253.000000, -464.000000)"
                                                          >
                                                              <g
                                                                  id="thumb-down"
                                                                  transform="translate(253.000000, 464.000000)"
                                                              >
                                                                  <path
                                                                      d="M14,0 L5,0 C4.2,0 3.5,0.5 3.2,1.2 L0.2,8.3 C0.1,8.5 0,8.7 0,9 L0,10.9 L0,11 C0,12.1 0.9,13 2,13 L8.3,13 L7.3,17.6 L7.3,17.9 C7.3,18.3 7.5,18.7 7.7,19 L8.8,20 L15.4,13.4 C15.8,13 16,12.5 16,12 L16,2 C16,0.9 15.1,0 14,0 L14,0 Z M18,0 L18,12 L22,12 L22,0 L18,0 L18,0 Z"
                                                                      id="Shape"
                                                                  />
                                                              </g>
                                                          </g>
                                                      </g>
                                                  </svg>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </>
                          );
                      })
                    : "No Candidates"}
            </div>
        </>
    );
};

export default VoteCard;
