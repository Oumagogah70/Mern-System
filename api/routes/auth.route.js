import express from 'express';
import {  google, signin, signup,authMiddle } from '../controllers/auth.controller.js';
import {authMiddleware} from '../utils/verifyUser.js'
const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/me',authMiddleware,authMiddle)

export default router;