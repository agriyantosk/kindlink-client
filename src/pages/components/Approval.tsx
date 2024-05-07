const Approval = ({ approvalState, contractState }: any) => {
    return (
        <>
            <div className="flex flex-col gap-10 w-full justify-center">
                <div className="w-full border border-gray-400 rounded-lg p-10 flex flex-col items-start justify-center">
                    <div className="flex items-center">
                        <h1>Platform Approval</h1>
                        {approvalState && approvalState.ownerAddress ? (
                            <>
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="30px"
                                    width="30px"
                                >
                                    <defs></defs>
                                    <title />
                                    <g data-name="Layer 28" id="Layer_28">
                                        <path
                                            className="cls-1"
                                            d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
                                        />
                                        <path
                                            className="cls-1"
                                            d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
                                        />
                                    </g>
                                </svg>
                            </>
                        ) : (
                            <svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                width="30px"
                            >
                                <title />
                                <g data-name="1" id="_1">
                                    <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" />
                                    <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" />
                                    <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" />
                                </g>
                            </svg>
                        )}
                    </div>
                    <div className="flex items-center">
                        <h1>Main Address Approval</h1>
                        <h1>
                            {approvalState &&
                            approvalState.withdrawalAddress ? (
                                <>
                                    <svg
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="100px"
                                        width="100px"
                                    >
                                        <defs></defs>
                                        <title />
                                        <g data-name="Layer 28" id="Layer_28">
                                            <path
                                                className="cls-1"
                                                d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
                                            />
                                            <path
                                                className="cls-1"
                                                d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
                                            />
                                        </g>
                                    </svg>
                                </>
                            ) : (
                                <svg
                                    viewBox="0 0 512 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="100px"
                                    width="100px"
                                >
                                    <title />
                                    <g data-name="1" id="_1">
                                        <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" />
                                        <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" />
                                        <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" />
                                    </g>
                                </svg>
                            )}
                        </h1>
                    </div>
                    <div className="flex items-center">
                        <h1>Secondary Address Approval</h1>
                        <h1>
                            {approvalState &&
                            approvalState.coWithdrawalAddress ? (
                                <>
                                    <svg
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="100px"
                                        width="100px"
                                    >
                                        <defs></defs>
                                        <title />
                                        <g data-name="Layer 28" id="Layer_28">
                                            <path
                                                className="cls-1"
                                                d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
                                            />
                                            <path
                                                className="cls-1"
                                                d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
                                            />
                                        </g>
                                    </svg>
                                </>
                            ) : (
                                <svg
                                    viewBox="0 0 512 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="100px"
                                    width="100px"
                                >
                                    <title />
                                    <g data-name="1" id="_1">
                                        <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" />
                                        <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" />
                                        <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" />
                                    </g>
                                </svg>
                            )}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Approval;
