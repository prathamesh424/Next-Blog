"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Link from 'next/link';
import axios from 'axios';

const resetPassword = () => {
    const [email , setEmail] = useState("")
    const router = useRouter();

    const EmailSend = async () => {
        try {
            const response  = await axios.post('/api/users/resetpassword', {email});
            console.log("Email sent successfully", response.data) ;
            router.push('/login')
        } catch (error) {
            console.log("Failed sending email: ", error.message);
        }
    }
    return (
    <div className="justify-start mt-32 gap-8 items-center flex flex-col min-h-screen py-2 ">
        <h1 className="font-bold text-3xl ">Reset Password</h1> 
            <div className="flex flex-col border-orange-500 border-2 rounded-3xl text-black py-10 mx-10 px-4">
                <label htmlFor="email" className="text-white">Email</label>
                <input id="email" type="email" placeholder="write your valid email" className="p-2 border-2 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={EmailSend} className="p-2 w-20 mx-auto hover:text-black text-white rounded-xl bg-orange-500 mt-4 hover:bg-orange-700">Submit</button>
            <Link href='/login'>
                    <p className=" mt-5 underline text-orange-600 hover:text-white ">Login ?</p>
            </Link>  
            </div>
    </div>
    )
 
}

export default resetPassword



