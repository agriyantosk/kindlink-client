import DevFilter from "./components/DevFilter";
import DevTable from "./components/DevTable";

const Dev = () => {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center border border-gray-700 rounded-lg">
                <div>
                    <DevTable />
                </div>
            </div>
        </>
    );
};

export default Dev;
