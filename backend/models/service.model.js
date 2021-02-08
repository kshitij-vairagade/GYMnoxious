const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema


const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        trime:true,
        require:true,
        maxlength:200
    },
    description:{
        type:String,
        require:true,
    }, 
    fees:{
        type:Number,
        require:true,
        trime:true,
        maxlength:32
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true,
    },
    quantity:{
        type:Number,
    },
    city:{
        type:String,
        trime:true,
        default:"Pune"
    },
    sold:{
        type:Number,
        default: 0
    },
    photo:{
        data: Buffer,
        contentType: String
    }
  
}, {timestamps:true}
);




module.exports = mongoose.model("Service", serviceSchema)