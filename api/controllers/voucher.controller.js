const { Voucher, Item } =require( "../models/voucher.model.js");
const User =require( "../models/user.model.js");
const Perdm =require( "../models/perdm.model.js")
const { errorHandler } =require( "../utils/error.js");
const { NetworkContextImpl } =require( "twilio/lib/rest/supersim/v1/network.js");

const test = (req, res) => {
  res.json({ message: "API is working!" });
};

const create = async (req, res, next) => {
  try {
    const { items, sentTo, sentBy, totalPrice, totalQuantity } = req.body;
    //check if person is an object (selected =require( a list) or a string(manually entered)

    const sentByTo = await User.findOne({ username: sentTo });
    const sentFrom = await User.findOne({ username: sentBy });

    //create new items instances
    const newItemPromises = items.map(async (item) => {
      const newItem = new Item(item);
      await newItem.save();
      return newItem;
    });

    // wait for all item instance to be saved
    const newItems = await Promise.all(newItemPromises);

    //create a new voucher instance
    const newVoucher = new Voucher({
      items: newItems,
      sentTo: sentByTo._id,
      sentBy: sentFrom._id,
      totalPrice,
      totalQuantity,
    });
    await newVoucher.save();
    res.status(201).json({ message: "Voucher created successfully" });
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