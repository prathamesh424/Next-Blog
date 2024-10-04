import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a email address"],
        unique: true
    },
    username: {
        type: String,
        required: [true , "Provide a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true , "Provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    } ,
    forgotPasswordToken: String ,
    forgotPasswordTokenExpiry: Date ,
    verifyToken: String ,
    verifyTokenExpiry: Date ,
});


const User = mongoose.models.users ||  mongoose.model('user', userSchema);

export default User;