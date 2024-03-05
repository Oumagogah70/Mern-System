import User from "../models/user.model.js";
import Vaccibox from "../models/vaccibox.model.js";

export const createVaccibox = async(req,res,next)=>{
    try {
        const{
            createdBy,
            serialNumber,
            warranty,
            fridgeId,
            status
        } = req.body;
        const createdByTo = await User.findOne({username:createdBy})

        const vaccibox = new Vaccibox({
            createdBy: createdByTo,
            serialNumber,
            warranty,
            fridgeId,
            status,

        });
        await vaccibox.save();
        res.status(201)
           .json({message:'vaccibox created successfully'})
    } catch (error) {
        console.error("Error creating vaccibox:", error);
        res.status(500).json({error:"Internal server error"})
    }
};

export const getVaccibox = async(req,res) =>{
    if(!req.user ||(req.user.role !== 'admin' && req.user.role !=='staff')){
        return res.status(403).json({message:"Forbidden"});
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc'?1:-1;

        let vacciboxs;
        if(req.user.role ==='admin'){
            vacciboxs = await Vaccibox.find()
            .sort({createdAt: sortDirection})
            .skip(startIndex)
            .limit(limit)
            .populate("createdBy","username")
        }else if(req.user.role ===  'staff'){
            vacciboxs = await Vaccibox.find({$or : [{createdBy:req.user.id}]})
            .sort({createdAt: sortDirection})
            .skip(startIndex)
            .limit(limit)
            .populate("createdBy","username")
        }

        const totalVaccibox = await Vaccibox.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() -1,
            now.getDate()
        );
        const lastMonthVaccibox = await Vaccibox.countDocuments({
            createdAt:{$gte:oneMonthAgo},
        });
        return res.status(200).json({
            vacciboxs,
            totalVaccibox,
            lastMonthVaccibox
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"})
        
    }
}