import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { client } from "../../client/client";
import { getUserByUserName } from "../../client/query";
import { AuthApi } from "../../api/AuthApi.js";
import { UserApi } from "../../api/UserApi";

import Cookies from "js-cookie";
import Logo from "../../assets/Logo";
import axios from "axios";

import RedBanner from "./RedBanner";
import { setToken } from "../../services/token";

import { createSessionConfig } from "../../services/configApi";

const Login = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [user, setUser] = useState(null);
    const isMounted = useRef(false);
    const Auth = useContext(AuthApi);
    const CurrentUser = useContext(UserApi);
    const navigate = useNavigate();
    let [count, setCount] = useState(0);
    const [wrong, setWrong] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    // logging every input from user
    const handleChange = (e) => {
        setUserInput((oldInput) => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value,
            };
        });
    };

    //https://typeofnan.dev/how-to-prevent-useeffect-from-running-on-mount-in-react/
    //preventing useEffect being called at mount
    useEffect(() => {
        if (isMounted.current) {
            const loginUser = async () => {
                const { name, ...rest } = userInput;
                console.log(createSessionConfig(rest));

                await axios(createSessionConfig(rest))
                    .then((response) => {
                        setToken(response.data);
                        setWrong(false);
                        Auth.setAuth(true); // ????????
                        navigate("/", { replace: true });
                    })
                    .catch((error) => {
                        console.log(error);
                        setWrong(true);
                    });
            };
            loginUser();
        } else {
            isMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const handleSubmit = () => {
        setCount((c) => c + 1);
    };

    return (
        <div>
            <section className='h-screen primary-color'>
                <div className='px-6 h-full text-gray-800'>
                    <div className='flex xl:justify-center w-1000 lg:justify-center justify-center items-center flex-wrap h-full g-6'>
                        <div className='flex flex-col justify-center items-center'>
                            {wrong && <RedBanner />}
                            <Logo />
                            <form onSubmit={onSubmit}>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <input
                                        type='email'
                                        name='email'
                                        id='email'
                                        className='block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required=''
                                        value={userInput.email}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor='email'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        email
                                    </label>
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <input
                                        type='text'
                                        name='name'
                                        id='name'
                                        className='block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required=''
                                        value={userInput.name}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor='name'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        Username
                                    </label>
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <input
                                        type='password'
                                        name='password'
                                        id='password'
                                        className='block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required=''
                                        value={userInput.password}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor='password'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className='text-center lg:text-left'>
                                    <button
                                        type='submit'
                                        onClick={handleSubmit}
                                        className='w-full inline-block px-7 py-3 secondary-color text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
