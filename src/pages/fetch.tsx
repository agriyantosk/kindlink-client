import { addData, deleteData, fetchData } from "@/utils/firebase";
import { useEffect, useState } from "react";

const Fetch = () => {
    const [data, setData] = useState<any>();
    const fetch = async () => {
        try {
            const fetchedData = await fetchData();
            setData(fetchedData);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetch();
    }, []);
    return (
        <>
            <div>
                <h1>Data: {JSON.stringify(data)}</h1>
            </div>
            <div className="flex gap-5">
                <button onClick={() => addData("AdaKami", "salah")}>
                    Add Foundation
                </button>
                <button onClick={() => deleteData("dOQ8KGVO2k03szMav42n")}>
                    Delete Foundation
                </button>
            </div>
        </>
    );
};

export default Fetch;
