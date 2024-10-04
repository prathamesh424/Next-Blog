import connectDB from "@/lib/database/db.js";
import User from "@/lib/models/user";
import { NextResponse , NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connectDB() ;


export async function POST(req  , res) {
    try { 

        const reqBody = await req.json();
        const { name, email, password } = reqBody;

        const user = User.findOne({ email: email})
        if(user ) {
            return res.json({
                error: "User Already Exists",
            } , {status : 400}) ; 
        }


        const salt = await bcryptjs.getSalt(10) ;
        const hashedPassword = await bcryptjs.hash(password, salt) ;

        const newUser = new User({
            name, 
            email, 
            password : hashedPassword
        })

        const save = await newUser.save()

        return res.json({
            message: "User Created Successfully",
        } ,{success: true}, {status : 201}) ;
        
    } catch (error) {
        return res.json({
            error: error.message
        } , {status : 500}) ;
    }

}