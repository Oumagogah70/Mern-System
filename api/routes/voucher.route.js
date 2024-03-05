import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { test, create, getVouchers,updateStatus,getVoucher } from '../controllers/voucher.controller.js';


const router = express.Router();


router.get('/test', test);
router.post('/create', create)
router.get('/getvouchers',verifyToken,getVouchers)
router.put('/:id/updatevouchers',updateStatus)
router.get('/:voucherId', getVoucher);


export default router