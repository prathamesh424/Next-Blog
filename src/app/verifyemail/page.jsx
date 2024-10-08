"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [type, setType] = useState(true);
    const [reset , setReset] = useState({
        password: "",
        conform_password: "",
        token : "" ,
        type : false
    })
    

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token , type})
            setVerified(true);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    }
    const ResetPassword = async () => { 
        try {
            await axios.post('/api/users/verifyemail', reset )
            setReset({
                password: "",
                conform_password: "" ,
                token : ""
            })
            console.log("Password Reset Successful")
        } catch (error) {
            console.log("Password Reset Failed", error.message)
        }
    }


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        const type = window.location.search.includes("verify");
        setType(type);
        setToken(urlToken || "");
        setReset({...reset, token : urlToken});
    }, []);


    useEffect(() => {
        if( type && token.length > 0 ) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="justify-start mt-32 gap-8 items-center flex flex-col min-h-screen py-2 ">
            {
                type ? 
                    <div >
                        <h1 className="text-4xl">Verify Email</h1>
                        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
                        {verified && (
                            <div>
                                <h2 className="text-2xl">Email Verified</h2>
                                <Link href="/login">
                                    Login
                                </Link>
                            </div>
                        )}
                        {error && (
                            <div>
                                <h2 className="text-2xl bg-red-500 text-black">Error</h2>

                            </div>
                        )}
                    </div>

                :
                    <div className="flex flex-col border-orange-500 border-2 rounded-3xl text-black py-10 mx-10 px-4">
                        <h1 className="font-bold text-2xl mb-5 text-orange-500">Reset Password</h1> 
                        <label htmlFor="password" className="text-white">Password</label>
                        <input id="password" type="password" placeholder="Create strong password" className="p-2 border-2 rounded-xl" value={reset.password} onChange={(e) => setReset({...reset, password: e.target.value})} />            
                        <label htmlFor="conform_password" className="text-white">Conform Password</label>
                        <input id="conform_password" type="password" placeholder="conform password" className="p-2 border-2 rounded-xl mt-2" value={reset.conform_password} onChange={(e) => setReset({...reset, conform_password: e.target.value})} />
                        <button onClick={ResetPassword} className="p-2 w-20 mx-auto hover:text-black text-white rounded-xl bg-orange-500 mt-4 hover:bg-orange-700">Submit</button>
                        <Link href='/login'>
                            <p className=" mt-5 underline text-orange-600 hover:text-white ">Login?</p>
                        </Link>  
                    </div>  
            }
            
        
        </div>   
    )

}

                
