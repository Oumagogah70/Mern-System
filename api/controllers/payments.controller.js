const Payments =require("../models/payments.model.js");
const User =require("../models/user.model.js");

const createPayments = async (req, res) => {
  try {
    const {
      type,
      paybillNumber,
      accountNumber,
      tillNumber,
      phoneNumber,
      amount,
      reason,
      sentTo,
      sentBy,
    } = req.body;
    const sentByTo = await User.findOne({ username: sentTo });
    const sentFrom = await User.findOne({ username: sentBy });

    const payment = new Payments({
      type,
      paybillNumber,
      accountNumber,
      tillNumber,
      phoneNumber,
      amount,
      reason,
      sentTo: sentByTo._id,
      sentBy: sentFrom._id,
    });

    await payment.save();
    res.status(201).json({message:'Payment created successfully', payment});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Failed to create payment"})
  }
};

const getPayments = async (req, res) => {
    if (!req.user || (req.user.role !== "admin" && req.user.role !== "staff")) {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === "asc" ? 1 : -1;
  
      let payments;
      if (req.user.role === "admin") {
        payments = await Payments.find()
          .sort({ createdAt: sortDirection })
          .skip(startIndex)
          .limit(limit)
          .populate("sentBy", "username")
          .populate("sentTo", "username");
      } else if (req.user.role === "staff") {
        payments = await Payments.find({
          $or: [{ sentBy: req.user.id }, { sentTo: req.user.id }],
        })
          .sort({ createdAt: sortDirection })
          .skip(startIndex)
          .limit(limit)
          .populate("sentBy", "username")
          .populate("sentTo", "username");
      }
  
      const totalPayments = await Payments.countDocuments();
  
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthPayments = await Payments.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      return res.status(200).json({
        payments,
        totalPayments,
        lastMonthPayments,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
};

module.exports ={createPayments, getPayments};