
import connectDB from "../../../../lib/database/db.js";
import { dataFromToken } from "../../../../lib/middleware/dataFromToken";
import User from "../../../../lib/models/user";
import { NextResponse } from "next/server";


connectDB() ;

export async function GET (request){
    try {
        const userId = await dataFromToken(request);
        if(!userId) return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        )
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({user});
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}



