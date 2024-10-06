import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'


export const dataFromToken =  (request) => {
    try {
        const token = request.cookies.get('token').value || "" ;
        if (!token) return  NextResponse.json(
            {message :"Missing User Information"}, 
            {status : 404})  ;
        const decodedToken =   jwt.verify(token, process.env.JWT_SECRET) ;
        return decodedToken.id ;
    } catch (error) {
        throw new  Error(error.message) ;
    }

}