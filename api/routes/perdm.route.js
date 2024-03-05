import express from 'express';
import { getUsersPerdm,createPerdm,getPerdms,updateStatus, getPerdm } from '../controllers/perdm.controller.js';
import passport from '../utils/passport.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router()

router.get('/getusersperdm', getUsersPerdm)
router.get('/getperdms', verifyToken,getPerdms)
router.get('/:perdmId',getPerdm)
router.post('/createperdm', createPerdm)
router.put('/:id/updatestatus',updateStatus)

export default router