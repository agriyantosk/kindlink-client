import Navbar from "./components/navbar";

const UnderDevelopment = () => {
    return (
        <>
            <div className="h-screen">
                <Navbar />
                <div className="flex justify-between w-[80%] mx-auto h-full items-center">
                    <div className="w-[50%] flex flex-col gap-3">
                        <h1 className="text-5xl font-bold text-blue-500">
                            Oopps!
                        </h1>
                        <h1 className="text-3xl font-bold text-blue-500">
                            Website Under Construction
                        </h1>
                        <p>
                            We are very sorry, this website is still under
                            development, we want to ensure you to get a full
                            experience out of our products. Stay tune for
                            further updates!
                        </p>
                    </div>
                    <div className="w-[50%]">
                        <img
                            src="https://cdn.icon-icons.com/icons2/1852/PNG/512/iconfinder-websiteunderconstruction-4417109_116618.png"
                            alt="Under Construction Animation"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnderDevelopment;
