import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";


const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loader />
    } else if (!loading && user) {
        return children
    } else {
        return <Navigate to="/login" replace={true} />
    }
};

export default PrivetRoute;