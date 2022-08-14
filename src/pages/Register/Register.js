// hashing password
// https://medium.com/@vuongtran/using-node-js-bcrypt-module-to-hash-password-5343a2aa2342
// https://www.npmjs.com/package/bcrypt
import React from "react";
import { useState, useEffect, useRef } from "react";

import { client } from "../../client/client";
import { getUserByUserName } from "../../client/query";

import CorrectError from "./CorrectError";
import WrongError from "./WrongError";
import Logo from "../../assets/Logo";

import axios from "axios";
import { createUserConfig } from "../../services/userApi";

const Register = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        password: "",
        passwordConfirmation: "",
        email: "",
    });
    const [userData, setUserData] = useState({});
    const [wrong, setWrong] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // logging user Input
    const handleChange = (e) => {
        setUserInput((oldInput) => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value,
            };
        });
    };

    // check if user Input is Valid
    const validateInput = () => {
        if (userInput.password !== userInput.passwordConfirmation) {
            return false;
        } else if (userInput.password === "") {
            return false;
        } else if (
            userInput.password.length <= 7 ||
            userInput.password.length >= 15
        ) {
            return false;
        }
        return true;
    };

    const processInput = () => {
        return {
            ...userInput,
            profilePicture:
                "https://cdn.sanity.io/images/u4d5r8ha/production/67a6aefb0f2bc30f87cc30115fc8563a5240c6bc-512x512.jpg",
        };
    };

    // try to register User
    const registerUser = async () => {
        console.log(processInput());
        return await axios(createUserConfig(processInput()))
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setWrong(false);
            })
            .catch((error) => {
                console.log(error);
                setWrong(true);
            });
    };

    // register data after fetch userData
    useEffect(() => {
        if (!validateInput()) {
            console.log("hrtr");
            setWrong(true);
            return;
        }
        registerUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    //on form submit fetch registered username
    //then create new user if username is not exist
    const handleSubmit = () => {
        setUserData(userInput);
        setIsSubmitted(true);
    };

    return (
        <div>
            <section className='h-screen primary-color'>
                <div className='px-6 h-full text-gray-800'>
                    <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6'>
                        <div className='flex flex-col justify-center items-center '>
                            {isSubmitted &&
                                (wrong ? <WrongError /> : <CorrectError />)}
                            <Logo />
                            <form onSubmit={handleSubmit}>
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
                                        Email
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
                                <div className='relative z-0 mb-6 w-full group'>
                                    <input
                                        type='password'
                                        name='passwordConfirmation'
                                        id='passwordConfirmation'
                                        className='block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required=''
                                        value={userInput.passwordConfirmation}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor='confirm'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        Confirm password
                                    </label>
                                </div>
                                <div className='text-center lg:text-left'>
                                    <button
                                        type='button'
                                        onClick={handleSubmit}
                                        className='w-full inline-block px-7 py-3 secondary-color  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                    >
                                        Register
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

export default Register;
