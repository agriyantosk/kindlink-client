import { useRouter } from "next/router";

const Detail = () => {
    const router = useRouter();
    const { address } = router.query;
    return (
        <>
            <div>
                <h1>Address: {address}</h1>
            </div>
        </>
    );
};

export default Detail;
