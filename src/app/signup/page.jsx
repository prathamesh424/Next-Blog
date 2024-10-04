"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from "react";

const Signup = () => {
    const router = useRouter() ;
    const [user , setUser] = useState({
        email: "",
        username: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)

    useEffect(() => {
        if(user.email.length > 0  && user.password.label > 0 && user.username.length >0) {
            setButtonDisabled(false)}
    },  [user])
    const onSignup =  async () => {

    }

    return (
        <div className="justify-start mt-32 gap-8 items-center flex flex-col min-h-screen py-2 ">
            <h1 className="font-bold text-3xl ">Signup</h1>
            <div className="flex flex-col border-orange-500 border-2 rounded-3xl text-black py-10 mx-10 px-4">
                <label htmlFor="email" className="text-white">Email</label>
                <input id="email" type="email" placeholder="write your valid email" className="p-2 border-2 rounded-xl" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                <label htmlFor="username" className="text-white">Username</label>

                <input id="username" type="text" placeholder="write Username" className="p-2  border-2 rounded-xl mt-2" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
                <label htmlFor="password" className="text-white">Password</label>

                <input id="password" type="password" placeholder="Create strong password" className="p-2 border-2 rounded-xl mt-2" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                <button onClick={onSignup} className="p-2 w-20 mx-auto hover:text-black text-white rounded-xl bg-orange-500 mt-4 hover:bg-orange-700">{buttonDisabled ? "Signup" : "Signup"}</button>
            
            </div>
            
        </div>
    )
 
}

export default Signup 