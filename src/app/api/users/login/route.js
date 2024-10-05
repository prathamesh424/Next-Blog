import connectDB from "../../../../lib/database/db";
import User from "../../../../lib/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken' ;


await connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;  
   
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return NextResponse.json({
                error: "User not Exists",
            }, { status: 400 });
        }

        const passwordCheck = await bcryptjs.compare(password, userExist.password);

        if (!passwordCheck) {
            return NextResponse.json({
                error: "Invalid Password",
            }, { status: 400 });
        }

        const tokenRawData = {
            id: userExist._id,
            email: userExist.email,
            username : userExist.username,
            
        }

        const token = await jwt.sign(tokenRawData, process.env.JWT_SECRET, { expiresIn: '1d' }); 
        
        const response =  NextResponse.json({
            message: "User Created Successfully",
            success: true
        });

        response.cookies.set("token" , token , {
            httpOnly : true,
        })

        return response;
    } 
    catch (error) {
        console.error("Error in signup:", error);
        return NextResponse.json({
            error: "Internal Server Error: " + error.message
        }, { status: 500 });
    }
}
