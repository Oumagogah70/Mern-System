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
    <>
    <Header/>
    <div className='min-h-screen flex flex-col md:flex-row'>
   
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}

      {/* dashboard voucher */}
      {tab === 'voucher' && <DashboardVoucher />}
      {/* dashboard perdm */}
      {tab === 'perdm' && <DashboardPerdm/>}
      {tab === 'timesheet' && <DashboardTime/>}
      {tab === 'vaccibox' && <DashboardVaccibox/>}
      {tab === 'accounts' && <DashboardAccount/>}
      {tab=== 'maintenance' && <DashboardMaintenance/>}
      {tab === 'form' && <DashboardForm/>}
      {tab === 'reports' && <DashboardReport/>}
    </div>
    </>
  );
}