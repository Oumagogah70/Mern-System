const express =require('express');
const { getApprovedStatus }  =require("../controllers/status.controller.js");

const router = express.Router();

router.get('/getstatus',getApprovedStatus)

module.exports =router;