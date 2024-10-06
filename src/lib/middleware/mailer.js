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
                verifyTokenExpiry: Date.now() + 3600000 }) 
        }
        else if (emailType === 'FORGOT_PASSWORD') {
            await User.findByIdAndUpdate(userId , 
            {
                forgotPasswordToken: HashedToken,
                forgotPasswordTokenExpiry: Date.now() + 1800000 }) 
        }
        var transport = nodemailer.createTransport({
           host: "sandbox.smtp.mailtrap.io",
           port: 2525,
           auth: {
             user: "7b9e1ae9a4f74e",
             pass: "efd9291f059e39"
           }
        });

        const mailOptions = {
            from: "gamerprathamesh4224@gmail.com",
            to: email,
            subject: emailType === 'VERIFY'? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${HashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?token=${HashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions) ;
        return mailResponse ;
 
    }
    catch (error) {
        console.error(error);
        throw new Error('Failed to send verification email');
    }

}