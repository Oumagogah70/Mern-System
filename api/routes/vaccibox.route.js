const express =require('express');
const { createVaccibox,getVaccibox } =require("../controllers/vaccibox.controller.js");
const { verifyToken } =require("../utils/verifyUser.js");


const router = express.Router()
router.post('/createvaccibox', createVaccibox)
router.get('/getvaccibox',verifyToken,getVaccibox)

module.exports =router;