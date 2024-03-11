require('dotenv/config.js');
const express =require('express');
const mongoose =require('mongoose');
const cookieParser =require('cookie-parser');
const passport =require('./utils/passport.js');
const {userRoutes, authRoutes, postRoutes, voucherRoutes, perdmRoutes, timeSheetRoutes, vacciboxRoutes, reportRoutes, statusRoutes, paymentsRoutes} =require('./routes/index.js');

const app = express();

// middleware
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cookieParser());

// routes
app.use(passport.initialize());
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/voucher',voucherRoutes);
app.use('/api/perdm',perdmRoutes);
app.use('/api/timesheet',timeSheetRoutes);
app.use('/api/vaccibox/',vacciboxRoutes);
app.use('/api/report',reportRoutes);
app.use('/api/status',statusRoutes);
app.use('/api/payments', paymentsRoutes);

// dkdaxzqjUAZJ0mIM


const PORT =process.env.PORT || 5000;
app.listen(PORT, async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Server is running on port ${PORT}`);
    } catch ({message}) {
        console.log(`Error starting server: ${message}`);
    }
});
