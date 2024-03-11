const mongoose =require("mongoose");

const vacciboxSchema = new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    serialNumber:{
        type:String,
        unique: true,
        required:true
        
    },
    warranty:{
        type:Number,
        required:true
    },
    fridgeId :{
        type:Number,
        unique: true,
        required:true,
        
    },
    status:{
        type:String,
        enum:['passive','active'],
        default:'passive'
    }
},
{timestamps:true}
);

const Vaccibox = mongoose.model('Vaccibox', vacciboxSchema);
module.exports =Vaccibox 