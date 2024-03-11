const Payments =require("../models/payments.model.js");
const Perdm =require("../models/perdm.model.js");
const { Voucher } =require("../models/voucher.model.js");


const getApprovedStatus = async (req, res) => {
    try { 
        const approvedVouchers = await Voucher.find({ status: 'approved' })
        .populate('sentTo', 'username') 
        .populate('sentBy', 'username'); 
      const approvedPerdms = await Perdm.find({ status: 'approved' })
        .populate('sentTo', 'username') 
        .populate('sentBy', 'username'); 
        const approvedPayments = await Payments.find({ status: 'approved' })
        .populate('sentTo', 'username') 
        .populate('sentBy', 'username'); 
    
  
      res.status(200).json({approvedPerdms,approvedVouchers,approvedPayments});
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports ={getApprovedStatus};