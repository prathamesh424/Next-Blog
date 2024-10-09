import { NextResponse } from "next/server";



export async function GET(){
    try {
        const response = NextResponse.json(
            {"Message" : "Logged Out Successfully"} ,
            {status :200}
        );
        response.cookies.set("token" , "" ,  {
            httpOnly : true,
            expires : new Date(0) 
        })
        return response;
    } 
    catch (error) {
        return NextResponse.json(
            {"Error Occur while Logout" : error.message} ,
            {status :500}
        )
    }
}