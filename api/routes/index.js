const userRoutes =require('./user.route.js')
const authRoutes =require('./auth.route.js');
const postRoutes =require('./post.route.js');
const voucherRoutes =require('./voucher.route.js');
const perdmRoutes =require('./perdm.route.js');
const timeSheetRoutes =require('./timesheet.route.js');
const vacciboxRoutes =require('./vaccibox.route.js');
const reportRoutes =require('./report.route.js');
const statusRoutes =require('./status.route.js');
const paymentsRoutes =require( './payments.route.js');

module.exports ={
    userRoutes, authRoutes, postRoutes,
    voucherRoutes, perdmRoutes, timeSheetRoutes,
    vacciboxRoutes, reportRoutes, statusRoutes,
    paymentsRoutes
}