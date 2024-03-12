import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from './utils/passport.js';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import voucherRoutes from './routes/voucher.route.js'
import perdmRoutes from './routes/perdm.route.js'
import timeSheetRoutes from './routes/timesheet.route.js'
import vacciboxRoutes from './routes/vaccibox.route.js'
import reportRoutes from './routes/report.route.js'
import statusRoutes from './routes/status.route.js'
import paymentsRoutes from './routes/payments.route.js'
import smsRoutes from './routes/sms.route.js'

dotenv.config();

// dkdaxzqjUAZJ0mIM
mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log('MongoDb is connected')
    }
)
.catch((err)=>{
    console.log(err);
})
const app = express();
app.use(express.json());
app.use(cookieParser())
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})


app.use(passport.initialize());
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)
app.use('/api/voucher',voucherRoutes)
app.use('/api/perdm',perdmRoutes)
app.use('/api/timesheet',timeSheetRoutes)
app.use('/api/vaccibox/',vacciboxRoutes)
app.use('/api/report',reportRoutes)
app.use('/api/status',statusRoutes)
app.use('/api/payments', paymentsRoutes)
app.use('/api/sms',smsRoutes)
