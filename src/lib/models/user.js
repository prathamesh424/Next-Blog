import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email address"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Provide a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

 const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
