const mongoose = require ('mongoose')

const connectdb = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/usertask')

        console.log("mongodb connect successfully")
    } catch (error) {

        console.log("mongodb connection faild",error)
        
    }
}
module.exports = connectdb;