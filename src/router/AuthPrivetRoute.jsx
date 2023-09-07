import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";


const AuthPrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loader />
    } else if (user) {
        return <Navigate to="/" replace={true} />
    } else {
        return children
    }
};

export default AuthPrivetRoute;