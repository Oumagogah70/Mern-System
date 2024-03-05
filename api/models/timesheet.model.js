import mongoose from "mongoose";

const timeShema = new mongoose.Schema({
    time:{type:Date,default:Date.now},
    type:{type:String, enum:['sign-in','sign-out']},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});

const TimeSheet = mongoose.model('TimeSheet',timeShema);
export default TimeSheet;