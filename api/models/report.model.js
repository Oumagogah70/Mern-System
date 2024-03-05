import mongoose from "mongoose";


const reportSchema = new mongoose.Schema(
    {
        sentTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        sentBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        title:{
            type:String,
            required:true,
            unique:true
        },
        image:{
            type:String,
        },
        content:{
            type:String,
            requi:true
        }
    },
    {timestamps:true}
);

const Reports = mongoose.model('Report',reportSchema);

export default Reports;