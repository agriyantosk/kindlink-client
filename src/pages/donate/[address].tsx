import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { queryEqualsTo } from "@/utils/firebase";
import FoundationSocials from "../components/FoundationSocials";

const Detail = () => {
    const router = useRouter();
    const { address } = router.query;
    const [detail, setDetail] = useState<any>();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const donationAmount = formData.get("donationAmount");
        console.log("Donation amount:", donationAmount);
    };

    const fetchFoundationDetails = async () => {
        try {
            if (address) {
                const data = await queryEqualsTo(
                    "foundations",
                    "contractAddress",
                    address as string
                );
                setDetail(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFoundationDetails();
    }, []);
    useEffect(() => {
        console.log(detail);
    }, [detail]);

    return (
        <>
            {detail && (
                <div className="flex justify-center mt-10 gap-5 h-[70%]">
                    <div className="w-full flex justify-start">
                        <img
                            src={detail[0]?.imgUrl}
                            className="object-fill"
                            alt="Foundation Logo"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-5 overflow-y-auto">
                        <div>
                            <h1 className="font-bold text-5xl">
                                {detail[0]?.name}
                            </h1>
                            <p>
                                Contract Address: {detail[0]?.contractAddress}
                            </p>
                        </div>
                        <div>
                            <h1>About the foundation:</h1>
                            <p className="text-justify">
                                {detail[0]?.description}
                            </p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="donationAmount">
                                    Enter Donation:
                                </label>
                                <input
                                    type="text"
                                    id="donationAmount"
                                    name="donationAmount"
                                />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        <div>
                            <FoundationSocials
                                websiteUrl={detail[0]?.websiteUrl}
                                instagramUrl={detail[0]?.instagraUrl}
                                xUrl={detail[0]?.xUrl}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Detail;
