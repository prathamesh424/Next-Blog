import User from "../../../../lib/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectDB from "../../../../lib/database/db";



export async function POST (request){
    try {
        await connectDB() ;
        const reqBody = await request.json();
        const {type , token} = reqBody;
        console.log(type);
        console.log(token);
        if (type) {
            const user = await User.findOne({verifyToken: token ,
                verifyTokenExpiry:{ $gt: Date.now()}
            })
            if(!user) return NextResponse.json(
                {error: "Invalid or Expired Token"},
                { status: 401 })
            user.isVerified = true ;
            user.verifyToken = undefined ;
            user.verifyTokenExpiry = undefined ;
            
            await user.save();
    
            return NextResponse.json(
                {message: "Email Verified Successfully" ,
                    success: true},
                { status: 200 })
        }
        else {
            const {password , conform_password} = reqBody ;
            console.log(password)
            console.log(conform_password)
            const user = await User.findOne({
                forgotPasswordToken: token ,
                forgotPasswordTokenExpiry:{ $gt: Date.now()}
            })
            if(!user) return NextResponse.json(
                {error: "Invalid or Expired Token"},
                { status: 401 })

            user.forgotPasswordToken = undefined ;
            user.forgotPasswordTokenExpiry = undefined ;

            if(password!== conform_password) {
                return NextResponse.json(
                    {error: "Passwords do not match"},
                    { status: 400 })
            }
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            user.password = hashedPassword ;
            await user.save();
            return NextResponse.json(
                {message: "Password Updated Successfully" ,
                    success: true},
                { status: 200 })
        }
    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            { status: 500 })
    }
}