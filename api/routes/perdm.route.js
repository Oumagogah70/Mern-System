const express =require('express');
const { getUsersPerdm,createPerdm,getPerdms,updateStatus, getPerdm } =require( '../controllers/perdm.controller.js');
const passport =require( '../utils/passport.js');
const { verifyToken } =require( '../utils/verifyUser.js');


const router = express.Router();

router.get('/getusersperdm', getUsersPerdm)
router.get('/getperdms', verifyToken,getPerdms)
router.get('/:perdmId',getPerdm)
router.post('/createperdm', createPerdm)
router.put('/:id/updatestatus',updateStatus)

module.exports =router;