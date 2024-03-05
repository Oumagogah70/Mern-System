import Reports from "../models/report.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createReport = async (req, res, next) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "staff")) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  const { sentTo, sentBy, title, content } = req.body;

  const sentByTo = await User.findOne({ username: sentTo });
  const sentFrom = await User.findOne({ username: sentBy });

  const newReport = new Reports({
    sentTo: sentByTo._id,
    sentBy: sentFrom._id,
    title,
    content,
  });
  try {
    const savedReports = await newReport.save();
    res.status(201).json(savedReports);
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "staff")) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    let reports;
    if (req.user.role === "admin") {
      reports = await Reports.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
        .populate("sentBy", "username")
        .populate("sentTo", "username");
    }
    else if(req.user.role === 'staff'){
        reports = await Reports.find({
            $or: [{ sentBy: req.user.id }, { sentTo: req.user.id }],  
        })
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
        .populate("sentBy", "username")
        .populate("sentTo", "username");
    }
    const totalReports = await Reports.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthReports =  await Reports.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      })
      return res.status(200).json({
        reports,
        totalReports,
        lastMonthReports
      })

  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"server error"})
  }

};
