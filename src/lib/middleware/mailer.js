import nodemailer from 'nodemailer';
import User from '../models/user';
import bcryptjs from 'bcryptjs';


export const sendVerificationEmail = async ({email ,emailType , userId}) => {
    try {
        const HashedToken =await bcryptjs.hash(userId.toString() , 10) ;

         if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId , 
            {
                verifyToken: HashedToken,
                verifyTokenExpiry: Date.now() + 3600000 })}
    
        else if (emailType === 'FORGOT_PASSWORD') {
            await User.findByIdAndUpdate(userId , 
            {
                forgotPasswordToken: HashedToken,
                forgotPasswordTokenExpiry: Date.now() + 1800000
            })
        }

        var transport = nodemailer.createTransport({
           host: "sandbox.smtp.mailtrap.io",
           port: 2525,
           auth: {
             user: "8be67511e56b46",
             pass: "ef5c1616504c6e"
           }
         });
        
        const mailOptions = {
            from: "gamerprathamesh4224@gmail.com",
            to: email,
            subject: emailType === 'VERIFY'? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.domain}/verifyemail?verifytoken=${HashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?verifytoken=${HashedToken}
            </p>`
        }


        const forgetMailOptions = {
            from: "gamerprathamesh4224@gmail.com",
            to: email,
            subject: 'Reset Password',
            html: `<p>Click <a href="${process.env.domain}/verifyemail?forgettoken=${HashedToken}">here</a> to reset your password
            or copy and paste the link below in your browser. 
            <br> ${process.env.domain}/verifyemail?forgettoken=${HashedToken}
            </p>`
        }


        if (emailType === "FORGOT_PASSWORD"){
            const forgetMailResponse = await transport.sendMail(forgetMailOptions) ;
            return forgetMailResponse ;
        }
        else if (emailType === "VERIFY"){ 
            const mailResponse = await transport.sendMail(mailOptions) ;
            return mailResponse ;
        }

        throw new Error("Invalid email Type");
    }
    catch (error) {
        console.error(error);
        throw new Error('Failed to send verification email');
    }

}