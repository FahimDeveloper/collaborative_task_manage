import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthPrivetRoute from "./AuthPrivetRoute";
import GroupPage from "../pages/Home/components/GroupPage";
import PrivetRoute from "./PrivetRoute";
import HomeInitialPage from "../pages/Home/components/HomeInitialPage";

export const router = createBrowserRouter([
    {
        path: "/", element: <App />,
        children: [
            {
                path: "/", element: <PrivetRoute><Home /></PrivetRoute>,
                children: [
                    {
                        path: "/", element: <PrivetRoute><HomeInitialPage /></PrivetRoute>
                    },
                    { path: "/groups/:groupId", element: <PrivetRoute><GroupPage /></PrivetRoute> }
                ]
            },
            { path: "/login", element: <AuthPrivetRoute><Login /></AuthPrivetRoute> },
            { path: "/register", element: <AuthPrivetRoute><Register /></AuthPrivetRoute> },
        ]
    }
])