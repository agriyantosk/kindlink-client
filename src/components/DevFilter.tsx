import { useState } from "react";

const DevFilter = ({ filter }: any) => {
    const { filterOption, setFilterOption } = filter;
    const handleFilterChange = (input: string) => {
        setFilterOption(input);
    };
    return (
        <>
            <div className="inline-flex rounded-md" role="group">
                <button
                    type="button"
                    onClick={() => handleFilterChange("progress")}
                    className={`px-4 py-2 w-60 text-sm font-medium ease-out transition-all duration-200 ${
                        filterOption === "progress"
                            ? "text-gray-100 bg-blue-500 hover:bg-blue-700 hover:text-gray-200"
                            : "text-blue-500 hover:bg-gray-100 hover:text-blue-700 bg-white"
                    } border border-gray-200 rounded-l-xl`}
                >
                    Voting Progress
                </button>
                <button
                    type="button"
                    onClick={() => handleFilterChange("add")}
                    className={`px-4 py-2 w-60 text-sm font-medium ease-out transition-all duration-200 ${
                        filterOption === "add"
                            ? "text-gray-100 bg-blue-500 hover:bg-blue-700 hover:text-gray-200"
                            : "text-blue-500 hover:bg-gray-100 hover:text-blue-700 bg-white"
                    } border-t border-b border-gray-200`}
                >
                    Add Candidate
                </button>
                <button
                    type="button"
                    onClick={() => handleFilterChange("withdraw")}
                    className={`px-4 py-2 w-60 text-sm font-medium ease-out transition-all duration-200 ${
                        filterOption === "withdraw"
                            ? "text-gray-100 bg-blue-500 hover:bg-blue-700 hover:text-gray-200"
                            : "text-blue-500 hover:bg-gray-100 hover:text-blue-700 bg-white"
                    } border border-gray-200 rounded-r-xl`}
                >
                    Withdraw Approval
                </button>
            </div>
        </>
    );
};

export default DevFilter;
