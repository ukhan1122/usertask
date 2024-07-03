const mongoose = require('mongoose')

const SignupSchma = new mongoose.Schema({
    name:{
        type:String,
        required:true,
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
    dob:{
        type:Date,
        required:true,
    },
    createdat:{
        type:Date,
        default:Date.now,
    },
});
const Singup = mongoose.model('Signup', SignupSchma)

module.exports = Singup;