import RootContainer from "../../components/RootContainer";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../../assets/AuthAnimation.json"
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { signIn, successLogin, authError } = useAuth();
    const onSubmit = (data) => {
        signIn(data.email, data.password).then(() => {
            successLogin();
        }).catch(error => authError(error.message))
    }
    return (
        <RootContainer>
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                <div className="bg-white shadow-xl border w-full grid grid-cols-2 items-center gap-10 px-20 py-10 rounded-xl">
                    <Lottie animationData={animation} loop={true} />
                    <div className="space-y-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <h3 className="text-center text-3xl font-medium">Sign In</h3>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email')} placeholder="Enter your email" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password')} placeholder="Enter your password" className="input input-bordered w-full" />
                            </div>
                            <div>
                                <button className="btn btn-primary w-full mt-2">sign in</button>
                            </div>
                        </form>
                        <div className="text-center space-y-2">
                            <p className="text-primary">New here? <Link to="/register" className="font-semibold">Create a New Account</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </RootContainer>
    );
};

export default Login;