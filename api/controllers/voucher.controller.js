const User =require( "../models/user.model.js");
const Perdm =require( "../models/perdm.model.js");
const { errorHandler } =require( "../utils/error.js");
const { Voucher, Item } =require( "../models/voucher.model.js");
const OutboundNotificationsService =require('../services/OutboundNotificationsService.js');
const { HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK } = require("../utils/http_status_codes.js");

const test = (req, res) => {
  res.json({ message: "API is working!" });
};

const create = async (req, res) => {
  try {
    const { payload, recipient_id, sender_id} = req.body;

    //check if person is an object (selected =require( a list) or a string(manually entered)
    const sender = await User.findById(sender_id);
    const receiver = await User.findById(recipient_id);

    if(sender && receiver){
      const newItemPromises = payload.map(async (item) => { //create new items instances
        const newItem = new Item(item);
        await newItem.save();
        return newItem;
      });
      
      const totalQuantity =payload.reduce((acc, {quantity}) =>{return acc +parseInt(quantity)}, 0);
      const totalPrice =payload.reduce((acc, {price, quantity}) =>{return acc +(parseFloat(price) *parseInt(quantity))}, 0);

      const newItems = await Promise.all(newItemPromises); // wait for all item instance to be saved
      const newVoucher = new Voucher({
          items: newItems,
          sentTo: receiver._id,
          sentBy: sender._id,
          totalPrice,
          totalQuantity,
        });
        await newVoucher.save();
        const {status, message} =await OutboundNotificationsService.sendsmsNotifications({
          phone: receiver.contact,
          message: `Dear ${receiver.names}, you have a voucher from ${sender.names}`
        });
        return status ==HTTP_200_OK? res.status(HTTP_201_CREATED).json({ message: "Voucher created successfully" }): res.status(status).json({message});
    }

    return res.status(HTTP_400_BAD_REQUEST).json({message: "Missing user details"})

  } catch (error) {
    console.error("Failed to create voucher", error);
    res.status(500).json({ message: "Failed to create voucher" });
  }
};

const getVouchers = async (req, res, next) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "staff")) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    let vouchers;
    if (req.user.role === "admin") {
      vouchers = await Voucher.find()
        .populate("sentBy", "username")
        .populate("sentTo", "username");
    } else if (req.user.role === "staff") {
      vouchers = await Voucher.find({
        $or: [{ sentBy: req.user.id }, { sentTo: req.user.id }],
      })
        .populate("sentBy", "username")
        .populate("sentTo", "username");
    }
    const totalVouchers = await Voucher.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthVouchers = await Voucher.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res.status(200).json({
      vouchers,
      totalVouchers,
      lastMonthVouchers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const voucher = await Voucher.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }
    res.json({ message: "Your voucher approved successfully", voucher });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

const getVoucher = async (req, res, next) => {
  try {
    const voucher = await Voucher.findById(req.params.voucherId)
      .populate("sentBy", "username")
      .populate("sentTo", "username");
    if (!voucher) {
      return next(errorHandler(404, "Voucher not found"));
    }
    res.status(200).json(voucher);
  } catch (error) {
    next(error);
  }
};

module.exports ={test, create, getVouchers, updateStatus, getVoucher}