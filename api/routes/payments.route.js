const express =require('express');
const { createPayments, getPayments } =require('../controllers/payments.controller.js');
const { verifyToken } =require( '../utils/verifyUser.js');

const router = express.Router();

router.post('/createpayments', createPayments);
router.get('/getpayments', verifyToken,getPayments);

module.exports =router;