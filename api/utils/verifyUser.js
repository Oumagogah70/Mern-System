import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.decode(token)
  console.log(decoded)
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = decoded;
    console.log('User ID:',decoded.id)
    next();
  });
};


export const authMiddleware = async(req,res, next)=>{
  try {
    const token = req.header.authorization.split(' ')[i];
    if(!token){
      return res.status(401).json({message:'Authorization token missing'});
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    if(!user){
      return res.status(404).json({message:'User not found'})
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden' });
    }


    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({message:'Invalid token'})
    
  }
}