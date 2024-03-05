import User from "../models/user.model.js";
import Perdm from "../models/perdm.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const getUsersPerdm = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createPerdm = async (req, res, next) => {
  try {
    const {
      sentTo,
      sentBy,
      itemName,
      itemDescription,
      itemPrice,
      itemQuantity,
      totalPrice,
    } = req.body;
    const sentByTo = await User.findOne({ username: sentTo });
    const sentFrom = await User.findOne({ username: sentBy });

    const perdm = new Perdm({
      sentTo: sentByTo._id,
      sentBy: sentFrom._id,
      itemName,
      itemDescription,
      itemPrice,
      itemQuantity,
      totalPrice,
    });

    await perdm.save();
    res
      .status(201)
      .json({ message: "Perdm entry created successfully", perdm });
  } catch (error) {
    console.error("Error creating Perdm entry:", error);
    res.status(500).json({ error: "Internal sever error" });
  }
};

export const getPerdms = async (req, res) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "staff")) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    let perdms;
    if (req.user.role === "admin") {
      perdms = await Perdm.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
        .populate("sentBy", "username")
        .populate("sentTo", "username");
    } else if (req.user.role === "staff") {
      perdms = await Perdm.find({
        $or: [{ sentBy: req.user.id }, { sentTo: req.user.id }],
      })
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
        .populate("sentBy", "username")
        .populate("sentTo", "username");
    }

    const totalPerdms = await Perdm.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPerdms = await Perdm.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res.status(200).json({
      perdms,
      totalPerdms,
      lastMonthPerdms,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getPerdm = async(req,res,next) =>{
  try {
    const perdm = await Perdm.findById(req.params.perdmId)
    .populate('sentBy','username')
    .populate('sentTo','username');

    if(!perdm){
      return next(errorHandler(404, 'Perdm not found'));
    }
    res.status(200).json(perdm);
  } catch (error) {
    next(error);
  }
}

export const updateStatus = async(req,res)=>{
  const {id} = req.params;
  const {status} =req.body;

  try {
    const perdm  = await  Perdm.findByIdAndUpdate(
      id,
      {status},
      {new:true}
    );
    if(!perdm){
      return res.status(404).json({message:"perdm not found"});
    }
    res.json({message:"Perdm approved successfully", perdm});
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({message:"Failed to update status"});
    
  }
}