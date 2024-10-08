import User from "../../../../lib/models/user";
import { NextResponse } from "next/server";

import connectDB from "../../../../lib/database/db";
import { sendVerificationEmail } from "../../../../lib/middleware/mailer";

 connectDB() ;

export async function POST (request){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        const user = await User.findOne({ email: email});
        if(!user) return NextResponse.json(
            {"Invalid Email Address" : "User not found"},
            {status: 404 }
        )
        await sendVerificationEmail({ email: email , emailType:'FORGOT_PASSWORD', userId: user._id});

        return NextResponse.json({
            message: "Verification email has send successfully!!!",
            success: true
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            {status: 500 }
        )
    }
  
}
