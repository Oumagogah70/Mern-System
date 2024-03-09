import express from 'express'
import { createPayments, getPayments } from '../controllers/payments.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createpayments',createPayments)
router.get('/getpayments', verifyToken,getPayments)

export default router