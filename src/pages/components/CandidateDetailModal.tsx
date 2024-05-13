import FoundationSocials from "./FoundationSocials";
import { useCandidateDetail, useModal } from "./Layout";

const CandidateDetailModal = () => {
    const { setShowModal } = useModal();
    const { candidateDetail } = useCandidateDetail();

    return (
        <>
            <div className="absolute w-[50%] h-[80%] bg-white border border-gray-700 rounded-xl p-10 flex flex-col gap-10">
                <div
                    onClick={() => setShowModal(false)}
                    className="text-right pr-10 text-gray-700 hover:text-blue-500 hover:underline cursor-pointer"
                >
                    X
                </div>
                <div className="flex gap-10 w-full justify-center h-[90%] items-start">
                    {candidateDetail && (
                        <>
                            <div className="w-full">
                                <img
                                    src={candidateDetail.imgUrl}
                                    alt="Candidate Logo"
                                    className="object-cover border border-gray-700 rounded-lg"
                                />
                                <div>
                                    <FoundationSocials
                                        page={"candidateModal"}
                                        websiteUrl={candidateDetail.websiteUrl}
                                        instagramUrl={
                                            candidateDetail.instagramUrl
                                        }
                                        xUrl={candidateDetail.xUrl}
                                        contractAddress={""}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 w-full h-full overflow-y-auto">
                                <h1 className="text-3xl font-bold">
                                    {candidateDetail.name}
                                </h1>
                                <div>
                                    <div>
                                        <h1 className="italic">
                                            About {candidateDetail.name}
                                        </h1>
                                        <p className="text-justify text-sm">
                                            {candidateDetail.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CandidateDetailModal;
