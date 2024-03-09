import express  from "express";
import { getApprovedStatus } from "../controllers/status.controller.js";

const router = express.Router();

router.get('/getstatus',getApprovedStatus)

export default router