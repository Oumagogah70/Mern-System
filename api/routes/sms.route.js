import express from "express";
import InfoBipAPIService from '../controllers/InfoBipAPIService.controller.js';

const router = express.Router()
const service = new InfoBipAPIService();

router.post('/send-sms', service.sendSMS);

export default router