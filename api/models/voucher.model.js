const mongoose =require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
});

const voucherSchema = new mongoose.Schema(
  {
    items: [itemSchema],
    sentTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalPrice: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

const Item = mongoose.model("Item", itemSchema);

module.exports ={ Voucher, Item };
