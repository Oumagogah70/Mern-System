const express =require('express');
const { verifyToken } =require( '../utils/verifyUser.js');
const { test, create, getVouchers,updateStatus,getVoucher} =require( '../controllers/voucher.controller.js');

const router = express.Router();

router.get('/test', test);
router.post('/create', create)
router.get('/getvouchers',verifyToken,getVouchers)
router.put('/:id/updatevouchers',updateStatus)
router.get('/:voucherId', getVoucher);

module.exports =router;