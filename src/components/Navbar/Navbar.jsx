import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import RootContainer from "../RootContainer";


const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log(user)
    return (
        <nav className="py-3 shadow-md fixed z-50 bg-white w-full">
            <RootContainer>
                <div className="flex justify-between">
                    <h3 className="italic text-3xl font-bold">Task Manage</h3>
                    <div className="flex gap-3 items-center justify-center">
                        {
                            user
                                ? <button onClick={logOut} className="btn btn-primary px-10">Log Out</button>
                                : <Link to="/login"><button className="btn btn-primary px-10">Login</button></Link>
                        }
                        {user?.email && <img src={user?.photoURL} className="w-12 h-12 object-cover rounded-full" alt="" />}
                    </div>
                </div>
            </RootContainer>
        </nav>
    );
};

export default Navbar;