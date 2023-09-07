import RootContainer from "../../components/RootContainer";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../../assets/AuthAnimation.json"
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../fetures/users/usersSlice";

const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const { signUp, successRegister, authError } = useAuth();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        signUp(data.email, data.password).then(res => {
            const user = res.user;
            updateProfile(user, {
                displayName: data.name,
                photoURL: data.photo
            }).then(() => {
                const userData = {
                    id: crypto.randomUUID(),
                    name: data.name,
                    email: data.email,
                    photo: data.photo
                }
                dispatch(addNewUser(userData))
                successRegister()
                reset();
            }).catch(error => authError(error.message))
        }).catch(error => authError(error.message))
    }
    return (
        <RootContainer>
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                <div className="bg-white shadow-xl border w-full grid grid-cols-2 items-center gap-10 px-20 py-10 rounded-xl">
                    <div className="space-y-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <h3 className="text-center text-3xl font-medium">Sign Up</h3>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register('name')} placeholder="Enter your name" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email')} placeholder="Enter your email" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="url" {...register("photo")} placeholder="Enter your photo url" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password')} placeholder="Enter your password" className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <button className="btn btn-primary w-full mt-2">sign up</button>
                            </div>
                        </form>
                        <div className="text-center space-y-2">
                            <p className="text-primary">Already registered? <Link to="/login" className="font-semibold">Go to login</Link></p>
                        </div>
                    </div>
                    <Lottie animationData={animation} loop={true} />
                </div>
            </div>
        </RootContainer>
    );
};

export default Register;