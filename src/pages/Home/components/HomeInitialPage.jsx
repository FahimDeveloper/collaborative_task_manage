import Lottie from "lottie-react";
import animation from "../../../assets/HomePageAnimation.json"

const HomeInitialPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h2 className="text-4xl font-semibold">Create Your groups and enjoy task management</h2>
                <Lottie className="w-[600px] mx-auto" animationData={animation} loop={true} />
            </div>
        </div>
    );
};

export default HomeInitialPage;