const mongose = require('mongoose')

const TaskSchema = new mongose.Schema({

    title:{
        type:String,
        required:true,

    },
   Completed:{
    type:Boolean,
     default:false
    },
    userId:{
        type:mongose.Schema.Types.ObjectId,
        ref:"login", 
        required:true
    }
})

const task = mongose.model("Task", TaskSchema)
module.exports = task;