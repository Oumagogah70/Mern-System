const TimeSheet =require("../models/timesheet.model.js");
const User =require("../models/user.model.js");

const createSignIn = async(req,res) =>{
    const {time, user} = req.body;

    try {
        const newTime = new TimeSheet({time, type:'sign-in',user});
        await newTime.save();
        res.status(201);
    } catch (error) {
        console.error('Error saving sign-in time:', error);
        res.status(500)
        
    }


}

const createSignOut = async(req,res) =>{
   const {time, user} = req.body;
   try {
    const newTime = new TimeSheet({time,type:'sign-out',user});
    await newTime.save();
    res.status(201);
   } catch (error) {
    console.error('Error saving sign-out time:', error);
    res.status(500);
    
   } 
}


const getTimeSheet = async (req, res) => {
    try {
      let timeSheetRecords;
      if (req.user.role === 'admin') {
        // console.log('Staff user ID:', req.user._id); 
        timeSheetRecords = await TimeSheet.find().populate({
          path: 'user',
          select: 'username',
        });
      }else if (req.user.role === 'staff') {
        // console.log('Staff user ID:', req.user.id); 
        timeSheetRecords = await TimeSheet.find({ user: req.user.id }).populate({
          path: 'user',
          select: 'username',
        });
      }
      res.json(timeSheetRecords);
    } catch (error) {
      console.error('Error fetching timesheet records:', error);
      res.status(500).json({ message: 'Failed to fetch timesheet records' });
    }
  };

module.exports ={createSignIn, createSignOut, getTimeSheet};