import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import Swal from "sweetalert2";



export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const successRegister = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully create an account',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const successLogin = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully login',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const authError = (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error}`,
        })
    }
    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        logOut,
        successRegister,
        successLogin,
        authError
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [auth]);
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;