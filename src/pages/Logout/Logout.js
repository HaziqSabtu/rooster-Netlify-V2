import React from "react";
import { AuthApi } from "../../api/AuthApi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { setToken } from "../../services/token";
import { useEffect } from "react";

import { deleteSessionConfig } from "../../services/configApi";

import axios from "axios";

const Logout = () => {
    const Auth = useContext(AuthApi);
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            await axios(deleteSessionConfig())
                .then((response) => {
                    setToken(response.data);
                    Auth.setAuth(false);
                    navigate("/", { replace: true });
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        logout();
    });
    return <div>loggedOut</div>;
};

export default Logout;
