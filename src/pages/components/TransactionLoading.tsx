import { useModal } from "./Layout";

const TransactionLoading = ({ loadingMessage }: any) => {
    const { setShowModal } = useModal();
    console.log(loadingMessage);
    return (
        <>
            <div className="absolute w-[50%] h-[80%] bg-white border border-gray-700 rounded-xl p-10 flex flex-col gap-10">
                {/* <div
                    onClick={() => setShowModal(false)}
                    className="text-right pr-10 text-gray-700 hover:text-blue-500 hover:underline cursor-pointer"
                >
                    X
                </div> */}
                <h1></h1>
            </div>
        </>
    );
};

export default TransactionLoading;
