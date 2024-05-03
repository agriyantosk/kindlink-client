import { Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useCandidateDetail, useModal } from "./Layout";

const VoteCard = ({ candidates }: any) => {
    const [countdown, setCountdown] = useState([]);
    const { setShowModal } = useModal();
    const { setCandidateDetail } = useCandidateDetail();
    const formatTime = (time: any) => {
        const days = Math.floor(time?.remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (time?.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (time?.remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((time?.remainingTime % (1000 * 60)) / 1000);
        return `${days.toString().padStart(2, "0")}d: ${hours
            .toString()
            .padStart(2, "0")}h: ${minutes
            .toString()
            .padStart(2, "0")}m: ${seconds.toString().padStart(2, "0")}s`;
    };

    const handleShowModal = (candidateIndex: number) => {
        setShowModal(true);
        setCandidateDetail(candidates[candidateIndex]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedCountdown = candidates.map((candidate: any) => {
                const endTime =
                    candidate.endVotingTime.seconds * 1000 +
                    candidate.endVotingTime.nanoseconds / 1000000;
                const remainingTime = endTime - Date.now();
                return {
                    id: candidate.id,
                    remainingTime: remainingTime > 0 ? remainingTime : 0,
                };
            });
            setCountdown(updatedCountdown);
        }, 1000);

        return () => clearInterval(interval);
    }, [candidates]);
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
                                                  <div>
                                                      {el.endVotingTime
                                                          .seconds *
                                                          1000 +
                                                          el.endVotingTime
                                                              .nanoseconds /
                                                              1000000 >
                                                      Date.now() ? (
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
                                                                      formatTime(
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
                                              <div className="w-full text-right">
                                                  <h1>Voted Participants</h1>
                                                  <h1 className="italic font-bold">
                                                      {el.yesVotes + el.noVotes}
                                                  </h1>
                                              </div>
                                          </div>
                                          <Progress
                                              className="bg-red-500"
                                              progress={Math.floor(
                                                  (el.yesVotes /
                                                      (el.yesVotes +
                                                          el.noVotes)) *
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
                                          <button className="rounded-xl w-full text-center bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                                              Vote Now
                                          </button>
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
