const express =require('express');
const {  google, signin, signup,authMiddle } =require('../controllers/auth.controller.js');
const {authMiddleware} =require('../utils/verifyUser.js')
const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/me',authMiddleware, authMiddle)

module.exports =router;