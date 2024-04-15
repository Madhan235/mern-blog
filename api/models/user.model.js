import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:'https://cdn4.vectorstock.com/i/1000x1000/52/68/purple-user-icon-in-the-circle-thin-line-vector-23745268.jpg'
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},
{timestamps:true}
);

const User = mongoose.model('User', userSchema);

export default User;
