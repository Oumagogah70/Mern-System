const express =require('express');
const {createSignIn,createSignOut,getTimeSheet } =require('../controllers/timesheet.controller.js');
const { verifyToken } =require('../utils/verifyUser.js');

const router = express.Router()
router.post('/createtimesheetin',createSignIn)
router.post('/createtimesheetout',createSignOut)
router.get('/gettimesheet',verifyToken,getTimeSheet)

module.exports =router;