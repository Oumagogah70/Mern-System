const mongoose =require("mongoose");

const perdmSchema = new mongoose.Schema(
    {
        sentBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        sentTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        itemName:{
            type:String,
            required:true,

        },
        itemDescription:{
            type:String,
            required:true,

        },
        itemPrice:{
            type:Number,
            required:true
        },
        itemQuantity:{
            type:Number,
            required:true
        },
        totalPrice:{
            type:Number,
            required:true
        }, 
        status: {
            type: String,
            enum: ['pending', 'approved', 'declined'],
            default: 'pending'
          }
    },
    { timestamps: true }
);

const Perdm = mongoose.model('Perdm', perdmSchema);
module.exports =Perdm;