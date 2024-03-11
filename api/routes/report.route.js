const express =require('express');
const { createReport, getReports } =require( "../controllers/report.controller.js");
const { verifyToken } =require( "../utils/verifyUser.js");

const router = express.Router()

router.post('/createreport',verifyToken,createReport)
router.get('/getreports',verifyToken,getReports)

module.exports =router;