const mongoose =require("mongoose");

const paymentsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["paybill", "tillnumber", "phonenumber"],
      required: true,
    },
    paybillNumber: {
      type: String,
      required: function () {
        return this.type === "pabill";
      },
    },
    accountNumber: {
      type: String,
      required: function () {
        return this.type === "pabill";
      },
    },
    tillNumber: {
      type: String,
      required: function () {
        return this.type === "tillnumber";
      },
    },
    phoneNumber: {
      type: String,
      required: function () {
        return this.type === "phonenumber";
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Payments = mongoose.model("Payments", paymentsSchema);
module.exports =Payments;
