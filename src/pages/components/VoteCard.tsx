const VoteCard = () => {
    return (
        <>
            <div className="w-96 h-full mt-10 flex flex-col gap-3 border border-gray-700 rounded-lg">
                <img
                    className="object-cover h-32 w-full"
                    src="https://lh3.googleusercontent.com/uO8XRTe3CbVecaN8j40Ysz7ePVqK0qcePQBO9y_EiwJUXQ0JxZlB3L9g_nIrddp_D_dL"
                    alt="Foundation Logo"
                />
                <div className="flex flex-col gap-3 p-3 justify-between">
                    <div>
                        <h1>KitaBisa</h1>
                        <p>LOREM IPSUM DOLOR</p>
                    </div>
                    <div className="w-full text-center">
                        <button className="rounded-md bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                            Vote Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VoteCard;
