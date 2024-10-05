"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useState } from "react";

const Login = () => {
    const [user , setUser] = useState({
        email: "",
        password: ""
    })
    const router = useRouter() ;

    useEffect(() => {

    })

    const onLogin =  async () => {
        try {
            const response = await axios.post('/api/users/login', user) ;
            console.log("User Login Successful", response.data) ;
            router.push('/home') ;
        } catch (error) {
            console.log("User Login Failed", error.message) ;
        }
    }

    return (
        <div className="justify-start mt-32 gap-8 items-center flex flex-col min-h-screen py-2 ">
            <h1 className="font-bold text-3xl ">Login</h1>
            <div className="flex flex-col border-orange-500 border-2 rounded-3xl text-black py-10 mx-10 px-4">
                <label htmlFor="email" className="text-white">Email</label>
                <input id="email" type="email" placeholder="write your valid email" className="p-2 border-2 rounded-xl" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />

                <label htmlFor="password" className="text-white">Password</label>

                <input id="password" type="password" placeholder="Create strong password" className="p-2 border-2 rounded-xl mt-2" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                <button onClick={onLogin} className="p-2 w-20 mx-auto hover:text-black text-white rounded-xl bg-orange-500 mt-4 hover:bg-orange-700">Login</button>
                
            </div>
            
        </div>
    )
 
}

export default Login 