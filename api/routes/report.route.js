import express  from "express";
import { createReport, getReports } from "../controllers/report.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/createreport',verifyToken,createReport)
router.get('/getreports',verifyToken,getReports)

export default router