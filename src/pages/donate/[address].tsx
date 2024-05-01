import { useRouter } from "next/router";
import { FormEvent } from "react";
import FoundationInfo from "../components/FoundationInfo";

const Detail = () => {
    const router = useRouter();
    const { address } = router.query;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const donationAmount = formData.get("donationAmount");
        console.log("Donation amount:", donationAmount);
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="w-[50%]">
                    <img
                        src="https://lh3.googleusercontent.com/uO8XRTe3CbVecaN8j40Ysz7ePVqK0qcePQBO9y_EiwJUXQ0JxZlB3L9g_nIrddp_D_dL"
                        alt="Foundation Logo"
                    />
                </div>
                <div className="w-[50%] flex flex-col gap-5">
                    <div>
                        <h1 className="font-bold text-5xl">KitaBisa</h1>
                        <p>Contract Address: {address}</p>
                    </div>
                    <div>
                        <h1>About the foundation:</h1>
                        <p className="text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse nunc dui, ullamcorper id est
                            tincidunt, porttitor venenatis nisl. Etiam aliquam
                            lacus nec erat dictum tempor. Pellentesque habitant
                            morbi tristique senectus et netus et malesuada fames
                            ac turpis egestas. Donec eget tincidunt augue, at
                            viverra erat. Fusce lacinia lectus vel tincidunt
                            sagittis. Nam eu ante et arcu suscipit blandit non
                            malesuada risus. Praesent tempus elit in odio
                            feugiat vulputate. Sed sollicitudin pellentesque mi
                            in egestas. Cras congue accumsan consectetur. Sed at
                            porta ex. Etiam pretium convallis lorem, ac placerat
                            purus convallis eu. Ut arcu tellus, tincidunt sed
                            feugiat nec, efficitur ac sapien. Vivamus ut tellus
                            sed mauris placerat euismod sed a quam. Donec ut
                            enim et turpis vestibulum sollicitudin ut eget enim.
                            Aliquam id cursus eros, a pharetra tellus.
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
                        <FoundationInfo />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
