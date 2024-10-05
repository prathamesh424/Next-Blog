import connectDB from "../../../../lib/database/db";
import User from "../../../../lib/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";




export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { username, email, password } = reqBody;  
   
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                error: "User Already Exists",
            }, { status: 400 });
        }
 
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
 
        const newUser = new User({
            username,   
            email,
            password: hashedPassword
        });
 
        const savedUser = await newUser.save();
        console.log("User created:", savedUser);

        return NextResponse.json({
            message: "User Created Successfully",
            success: true
        }, { status: 201 });
    } catch (error) {
         return NextResponse.json({
            error: "Internal Server Error: " + error.message
        }, { status: 500 });
    }
}
