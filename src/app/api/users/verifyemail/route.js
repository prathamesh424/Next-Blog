import User from "../../../../lib/models/user";
import { NextResponse } from "next/server";

import connectDB from "../../../../lib/database/db";

connectDB() ;

export async function POST (request){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken: token ,
            verifyTokenExpiry:{ $gt: Date.now()}
        })
        if(!user) return NextResponse.json(
            {error: "Invalid or Expired Token"},
            { status: 401 })
        console.log(user);
        user.isVerified = true ;
        user.verifyToken = undefined ;
        user.verifyTokenExpiry = undefined ;
        
        await user.save();

        return NextResponse.json(
            {message: "Email Verified Successfully" ,
                success: true},
            { status: 200 })

    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            { status: 500 })
    }
}