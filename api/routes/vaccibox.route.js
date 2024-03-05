import express  from "express";
import { createVaccibox,getVaccibox } from "../controllers/vaccibox.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router()
router.post('/createvaccibox', createVaccibox)
router.get('/getvaccibox',verifyToken,getVaccibox)

export default router