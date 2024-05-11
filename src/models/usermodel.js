import { verify } from "crypto";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema ({
    username:{
        type:String,
        required:[true,"Pls Provid username"],
        unique: true
    },
    email:{
        type:String,
        required:[true,"Pls Provid email"],
        unique: true
    },
    password:{
        type:String,
        required:[true,"Pls Provid password"],
   
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
    
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;