interface INoDataProps {
    input: string; // or the appropriate type for your input prop
}

const NoData: React.FC<INoDataProps> = ({ input }) => {
    return (
        <>
            <div className="h-full w-full flex flex-col gap-5 justify-center items-center">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
                    alt="No Data"
                />
                <h1>{input}</h1>
            </div>
        </>
    );
};

export default NoData;
