import { ImSpinner3 } from "react-icons/im";

const Loader = () => {
    return (
        <div className="h-[calc(100vh-80px)] flex justify-center items-center">
            <ImSpinner3 className="text-6xl animate-spin text-primary" />
        </div>
    );
};

export default Loader;