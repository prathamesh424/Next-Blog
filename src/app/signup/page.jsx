"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useEffect } from "react";

const Signup = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

     useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", user);
            console.log("User registered successfully:");
            router.push("/login");
        } catch (error) {
            console.log("Failed user registration: ", error.message);
        }
    };

    return (
        <div className="justify-start mt-32 gap-8 items-center flex flex-col min-h-screen py-2">
            <h1 className="font-bold text-3xl">Signup</h1>
            <div className="flex flex-col border-orange-500 border-2 rounded-3xl text-black py-10 mx-10 px-4">
                <label htmlFor="email" className="text-white">Email</label>
                <input 
                    id="email" 
                    type="email" 
                    placeholder="Enter a valid email" 
                    className="p-2 border-2 rounded-xl" 
                    value={user.email} 
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <label htmlFor="username" className="text-white">Username</label>
                <input 
                    id="username" 
                    type="text" 
                    placeholder="Enter Username" 
                    className="p-2 border-2 rounded-xl mt-2" 
                    value={user.username} 
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />

                <label htmlFor="password" className="text-white">Password</label>
                <input 
                    id="password" 
                    type="password" 
                    placeholder="Create a strong password" 
                    className="p-2 border-2 rounded-xl mt-2" 
                    value={user.password} 
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                <button 
                    onClick={onSignup} 
                    className={`p-2 w-20 mx-auto hover:text-black text-white rounded-xl bg-orange-500 mt-4 hover:bg-orange-700 ${buttonDisabled ? 'cursor-not-allowed' : ''}`}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "Fill all details" : "Signup"}
                </button>
            </div>
        </div>
    );
};

export default Signup;
