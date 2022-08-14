import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

//https://stackoverflow.com/questions/71060810/how-to-run-useeffect-before-render-for-authentication
import Login from "./pages/Login/Login.jsx";
import Logout from "./pages/Logout/Logout.js";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting.js";
import Register from "./pages/Register/Register.js";
import Navbar from "./components/Navbar.js";
import ChangeUserName from "./pages/setting/Changeusername.js";
import ChangePassword from "./pages/setting/Changepassword.js";
import ProtectedLogin from "./routes/ProtectedLogin.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import ProtectedRegister from "./routes/ProtectedRegister.js";
import ChangePic from "./pages/setting/Changepic.js";
import Sidebar from "./components/Sidebar.js";
import { client } from "./client/client.js";
import { getUserById } from "./client/query.js";
import { AuthApi } from "./api/AuthApi.js";
import { UserApi } from "./api/UserApi.js";

import Cookies from "js-cookie";

import axios from "axios";
import { getSessionConfig } from "./services/configApi.js";
import { getUserConfig } from "./services/userApi.js";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [auth, setAuth] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    /*
    TODO: SET ROUTES AND AUTH 
    */

    // read cookie on mount
    useEffect(() => {
        const readCookie = async () => {
            return await axios(getSessionConfig())
                .then((response) => {
                    processResponse(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getUser = async () => {
            return await axios(getUserConfig())
                .then((response) => {
                    setCurrentUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        // running in series if parallel
        // https://programmingwithswift.com/run-async-await-in-parallel-with-javascript/
        (async () => {
            await readCookie().catch((error) => console.log(error));
            await getUser().catch((error) => console.log(error));
            setIsLoading(false);
        })();
    }, []);

    const processResponse = (response) => {
        response.data ? setAuth(true) : setAuth(false);
        response.headers["x-access-token"]
            ? Cookies.set("accessToken", response.headers["x-access-token"])
            : console.log("ACCESS DENIED");
    };

    if (isLoading) {
        return <div>LOADING</div>;
    } else {
        return (
            <div>
                <AuthApi.Provider value={{ auth, setAuth }}>
                    <UserApi.Provider value={{ currentUser, setCurrentUser }}>
                        <Navbar />
                        <Routes>
                            <Route element={<ProtectedRoute />}>
                                <Route path='/*' element={<Home />} />
                                <Route path='/setting' element={<Setting />} />
                                <Route
                                    path='/setting/changepwd'
                                    element={<ChangePassword />}
                                />
                                <Route
                                    path='/setting/changepic'
                                    element={<ChangePic />}
                                />
                                <Route
                                    path='/setting/changeusername'
                                    element={<ChangeUserName />}
                                />
                            </Route>
                            <Route path='login' element={<ProtectedLogin />}>
                                <Route path='/login' element={<Login />} />
                            </Route>
                            <Route
                                path='register'
                                element={<ProtectedRegister />}
                            >
                                <Route
                                    path='/register'
                                    element={<Register />}
                                />
                            </Route>
                            <Route path='/logout' element={<Logout />}></Route>
                        </Routes>
                    </UserApi.Provider>
                </AuthApi.Provider>
            </div>
        );
    }
};

export default App;
