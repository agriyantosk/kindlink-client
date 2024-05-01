interface DonationData {}

const DonationCard = () => {
    return (
        <>
            <div className="h-72 w-72 mt-10 border border-gray-700 rounded-lg">
                <img
                    className="object-cover h-2/3 w-full"
                    src="https://lh3.googleusercontent.com/uO8XRTe3CbVecaN8j40Ysz7ePVqK0qcePQBO9y_EiwJUXQ0JxZlB3L9g_nIrddp_D_dL"
                    alt="Donation Card"
                />
                <div className="p-2">
                    <div>
                        <h1>TESTING INI CERITANYA DATA</h1>
                        <p>gatau apa</p>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-blue-500 hover:underline rounded-lg hover:bg-blue-500 hover:text-white p-1.5 hover:cursor-pointer w-max">
                            More Info &gt;&gt;&gt;
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DonationCard;
