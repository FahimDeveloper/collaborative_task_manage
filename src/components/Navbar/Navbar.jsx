import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import RootContainer from "../RootContainer";


const Navbar = () => {
    const { user } = useAuth();
    return (
        <nav className="py-3 shadow-md">
            <RootContainer>
                <div className="flex justify-between">
                    <h3 className="italic text-3xl font-bold">Task Manage</h3>
                    {
                        user
                            ? <button className="btn btn-primary px-10">add task</button>
                            : <Link to="/login"><button className="btn btn-primary px-10">Login</button></Link>}
                </div>
            </RootContainer>
        </nav>
    );
};

export default Navbar;