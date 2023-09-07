import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthPrivetRoute from "./AuthPrivetRoute";

export const router = createBrowserRouter([
    {
        path: "/", element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <AuthPrivetRoute><Login /></AuthPrivetRoute> },
            { path: "/register", element: <AuthPrivetRoute><Register /></AuthPrivetRoute> },
        ]
    }
])