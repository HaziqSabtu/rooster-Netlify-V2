//https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthApi } from "../api/AuthApi.js";

const ProtectedLogin = () => {
    // receive context from API
    const Auth = useContext(AuthApi);

    // If not authorized, return an outlet that will render login page
    // Else, return element that will navigate to main
    return !Auth.auth ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedLogin;
