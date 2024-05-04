import DevFilter from "./components/DevFilter";
import DevTable from "./components/DevTable";
import { useFilterContext } from "./components/Layout";

const Dev = () => {
    const { filterOption, setFilterOption } = useFilterContext();
    return (
        <>
            <div className="w-full h-full flex justify-center items-center border border-gray-700 rounded-lg">
                <div className="flex flex-col justify-center items-center w-full">
                    <DevFilter filter={{ filterOption, setFilterOption }} />
                    <DevTable filterOption={filterOption} />
                </div>
            </div>
        </>
    );
};

export default Dev;
