import { NextResponse } from "next/server";
import connectDB from "../../../../lib/database/db";
import Blog from "../../../../lib/models/blog";




export async function GET(request){
   try {
        await connectDB();
        const blogs = await Blog.find({});
        console.log(blogs);
        return NextResponse.json(blogs) ;
   } catch (error) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
   }
}