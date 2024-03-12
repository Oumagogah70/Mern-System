import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import DashboardVoucher from '../components/DashboardVoucher';
import DashboardPerdm from '../components/DashboardPerdm';
import DashboardTime from '../components/DashboardTime';
import Header from '../components/Header';
import DashboardVaccibox from '../components/DashboardVaccibox';
import DashboardAccount from '../components/DashboardAccount';
import DashboardMaintenance from '../components/DashboardMaintenance';
import DashboardForm from '../components/DashboardForm';
import DashboardReport from '../components/DashboardReport';
import DashboardPayments from '../components/DashboardPayments';


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    // <>
    //   <Header />
    //   <div className="min-h-screen flex flex-col md:flex-row">
    //     <div className="md:w-56">
    //       {/* Sidebar */}
    //       <DashSidebar />
    //     </div>
    //     <div className="md:ml-3 md:mt-0 flex-1">
    //       {/* Content */}
    //       {tab === 'profile' && <DashProfile />}
    //       {tab === 'posts' && <DashPosts />}
    //       {tab === 'users' && <DashUsers />}
    //       {tab === 'comments' && <DashComments />}
    //       {tab === 'dash' && <DashboardComp />}
    //       {tab === 'voucher' && <DashboardVoucher />}
    //       {tab === 'perdm' && <DashboardPerdm />}
    //       {tab === 'timesheet' && <DashboardTime />}
    //       {tab === 'vaccibox' && <DashboardVaccibox />}
    //       {tab === 'payments' && <DashboardPayments />}
    //       {tab === 'accounts' && <DashboardAccount />}
    //       {tab === 'maintenance' && <DashboardMaintenance />}
    //       {tab === 'form' && <DashboardForm />}
    //       {tab === 'reports' && <DashboardReport />}
    //     </div>
    //   </div>
    // </>
    <>
    <Header />
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <div className="flex-1 md:ml-3">
        {/* Content */}
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'users' && <DashUsers />}
        {tab === 'comments' && <DashComments />}
        {tab === 'dash' && <DashboardComp />}
        {tab === 'voucher' && <DashboardVoucher />}
        {tab === 'perdm' && <DashboardPerdm />}
        {tab === 'timesheet' && <DashboardTime />}
        {tab === 'vaccibox' && <DashboardVaccibox />}
        {tab === 'payments' && <DashboardPayments />}
        {tab === 'accounts' && <DashboardAccount />}
        {tab === 'maintenance' && <DashboardMaintenance />}
        {tab === 'form' && <DashboardForm />}
        {tab === 'reports' && <DashboardReport />}
      </div>
    </div>
  </>
  );
}