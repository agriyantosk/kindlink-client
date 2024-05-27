const CurvedStepper = () => {
    return (
        <>
            <section className="max-w-5xl mx-auto py-10">
                <div>
                    <div className="flex flex-row">
                        <div className="hidden md:flex flex-col items-center">
                            <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                                <div className="text-xl font-black text-gray-500">
                                    Donate
                                </div>
                                {/* <div className="text-gray-500 text-sm">
                                    Idea
                                </div> */}
                            </div>
                            <div className="h-full border-l-4 border-transparent">
                                <div className="border-l-4 mr-4 h-full border-gray-300 border-dashed"></div>
                            </div>
                        </div>
                        <div className="flex-auto border rounded  border-gray-300">
                            <div className="flex md:flex-row flex-col items-center">
                                <div className="flex-auto">
                                    <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500">
                                        <span className="font-black">Vote</span>{" "}
                                        {/* - Idea */}
                                    </div>
                                    <div className="p-3 text-3xl text-gray-800 font">
                                        Make Transparent Donations
                                    </div>
                                    <div className="px-3 pb-6">
                                        Donate to your favorite foundations with
                                        full transparency. Each donation is
                                        recorded on the blockchain, ensuring
                                        that every transaction is publicly
                                        visible and verifiable. When foundations
                                        withdraw funds, the transaction is
                                        routed through KindLink, emitting events
                                        that provide a clear activity log.
                                    </div>
                                </div>
                                <div className="md:w-96 w-full p-5">
                                    <img
                                        src="https://cdn-icons-png.freepik.com/256/1355/1355174.png?semt=ais_hybrid"
                                        alt="Transparent Donation Icon"
                                        className="object-scale-down"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start flex-row">
                        <div className="border-t-4 border-r-4 border-transparent">
                            <div className="w-16 ml-16 h-16 border-l-4 border-gray-300 border-dashed border-b-4 rounded-bl-full"></div>
                        </div>
                        <div className="border-t-4 border-transparent flex-auto">
                            <div className="h-16 border-b-4 border-gray-300 border-dashed"></div>
                        </div>
                        <div className="w-16 mt-16 mr-16 h-16 border-r-4 border-gray-300 border-dashed border-t-4 rounded-tr-full"></div>
                    </div>
                    <div className="flex flex-row-reverse">
                        <div className="hidden md:flex flex-col items-center">
                            <div className="w-32 py-5 border border-gray-300 rounded ml-4 uppercase flex flex-col items-center justify-center">
                                <div className="text-xl font-black text-gray-500">
                                    Vote
                                </div>
                                {/* <div className="text-gray-500 text-sm">
                                    Collaboration
                                </div> */}
                            </div>
                            <div className="h-full border-r-4 border-transparent">
                                <div className="border-l-4 ml-4 h-full border-gray-300 border-dashed"></div>
                            </div>
                        </div>
                        <div className="flex-auto border rounded  border-gray-300">
                            <div className="flex md:flex-row flex-col items-center">
                                <div className="flex-auto">
                                    {/* <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500">
                                        <span className="font-black">Vote</span>{" "}
                                        - Collaboration
                                    </div> */}
                                    <div className="p-3 text-3xl text-gray-800 font">
                                        Participate in Community Voting
                                    </div>
                                    <div className="px-3 pb-6">
                                        Help decide which new foundations join
                                        the KindLink platform. Periodically,
                                        KindLink proposes new foundations for
                                        the community to vote on. Voting lasts
                                        for 3 days, and only users with a
                                        history of donating at least 1 ETH can
                                        participate, ensuring a fair and genuine
                                        voting process.
                                    </div>
                                </div>
                                <div className="md:w-96 w-full p-5">
                                    <img
                                        src="https://static.thenounproject.com/png/981691-200.png"
                                        alt="Voting Icon"
                                        className="object-scale-down"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start flex-row-reverse">
                        <div className="border-t-4 border-l-4 border-transparent">
                            <div className="w-16 mr-16 h-16 border-r-4 border-gray-300 border-dashed border-b-4 rounded-br-full"></div>
                        </div>
                        <div className="border-t-4 border-transparent flex-auto">
                            <div className="h-16 border-b-4 border-gray-300 border-dashed"></div>
                        </div>
                        <div className="w-16 mt-16 ml-16 h-16 border-l-4 border-gray-300 border-dashed border-t-4 rounded-tl-full"></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="hidden md:flex flex-col items-center">
                            <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                                <div className="text-xl font-black text-gray-500">
                                    Withdraw
                                </div>
                                {/* <div className="text-gray-500 text-sm">
                                    Planification
                                </div> */}
                            </div>
                            <div className="h-full border-l-4 border-transparent">
                                <div className="border-l-4 mr-4 h-full border-gray-300 border-dashed"></div>
                            </div>
                        </div>
                        <div className="flex-auto border rounded  border-gray-300">
                            <div className="flex md:flex-row flex-col items-center">
                                <div className="flex-auto">
                                    <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500">
                                        <span className="font-black">
                                            Withdrawals
                                        </span>{" "}
                                        {/* - Planification */}
                                    </div>
                                    <div className="p-3 text-3xl text-gray-800 font">
                                        Ensure Secure Withdrawals
                                    </div>
                                    <div className="px-3 pb-6">
                                        Each foundation&apos;s withdrawal
                                        requests require three approvals: from
                                        the foundation owner, the co-owner, and
                                        the KindLink platform. This
                                        multi-signature approach protects
                                        against misuse of funds and maintains
                                        trust within the community.
                                    </div>
                                </div>
                                <div className="md:w-96 w-full p-5">
                                    <img
                                        src="https://cdn-icons-png.freepik.com/512/1682/1682308.png"
                                        alt="Withdrawl Icon"
                                        className="object-scale-down"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start flex-row">
                        <div className="border-t-4 border-r-4 border-transparent">
                            <div className="w-16 ml-16 h-16 border-l-4 border-gray-300 border-dashed border-b-4 rounded-bl-full"></div>
                        </div>
                        <div className="border-t-4 border-transparent flex-auto">
                            <div className="h-16 border-b-4 border-gray-300 border-dashed"></div>
                        </div>
                        <div className="w-16 mt-16 mr-16 h-16 border-r-4 border-gray-300 border-dashed border-t-4 rounded-tr-full"></div>
                    </div>
                    <div className="flex flex-row-reverse">
                        <div className="hidden md:flex flex-col items-center">
                            <div className="w-32 py-5 border border-gray-300 rounded ml-4 uppercase flex flex-col items-center justify-center">
                                <div className="text-xl font-black text-gray-500">
                                    Monitor
                                </div>
                                {/* <div className="text-gray-500 text-sm">
                                    Implementation
                                </div> */}
                            </div>
                        </div>
                        <div className="flex-auto border rounded  border-gray-300">
                            <div className="flex md:flex-row flex-col items-center">
                                <div className="flex-auto">
                                    <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500">
                                        <span className="font-black">
                                            Monitor
                                        </span>{" "}
                                        {/* - Implementation */}
                                    </div>
                                    <div className="p-3 text-3xl text-gray-800 font">
                                        Track Your Donations
                                    </div>
                                    <div className="px-3 pb-6">
                                        Monitor your contributions with ease.
                                        Each donation and withdrawal is recorded
                                        and can be tracked through the KindLink
                                        platform. Detailed event logs provide a
                                        transparent view of how funds are being
                                        utilized by the foundations, ensuring
                                        your donations are making a difference.
                                    </div>
                                </div>
                                <div className="md:w-96 w-full p-5">
                                    <img
                                        src="https://static.thenounproject.com/png/2845472-200.png"
                                        alt="Keep Track Icon"
                                        className="object-scale-down"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CurvedStepper;
