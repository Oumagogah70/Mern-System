import express  from "express";
import {createSignIn,createSignOut,getTimeSheet } from '../controllers/timesheet.controller.js'
const router = express.Router()
import { verifyToken } from '../utils/verifyUser.js';

router.post('/createtimesheetin',createSignIn)
router.post('/createtimesheetout',createSignOut)
router.get('/gettimesheet',verifyToken,getTimeSheet)

export default router