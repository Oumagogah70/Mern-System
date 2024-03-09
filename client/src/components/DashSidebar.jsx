import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiOutlineCog,
  HiOutlineCash
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signoutSuccess()); 
        navigate('/')
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.role === 'admin' && (
            <>
              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item
                  active={tab === 'dash' || !tab}
                  icon={HiChartPie}
                  as='div'
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=profile'>
                <Sidebar.Item
                  active={tab === 'profile'}
                  icon={HiUser}
                  label='Admin'
                  labelColor='dark'
                  as='div'
                >
                  Profile
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=posts'>
                <Sidebar.Item
                  active={tab === 'posts'}
                  icon={HiDocumentText}
                  as='div'
                >
                  Posts
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=accounts'>
                <Sidebar.Item
                  active={tab === 'accounts'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Accounts
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=payments'>
                <Sidebar.Item
                  active={tab === 'payments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Payments
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=voucher'>
                <Sidebar.Item
                  active={tab === 'voucher'}
                  icon={HiOutlineCash}
                  as='div'
                >
                  Vouchers
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=perdm'>
                <Sidebar.Item
                  active={tab === 'perdm'}
                  icon={HiOutlineCash}
                  as='div'
                >
                  Perdm
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=timesheet'>
                <Sidebar.Item
                  active={tab === 'timesheet'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Timesheet
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=form'>
                <Sidebar.Item
                  active={tab === 'form'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Forms
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=vaccibox'>
                <Sidebar.Item
                  active={tab === 'vaccibox'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Vaccibox
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=maintenance'>
                <Sidebar.Item
                  active={tab === 'maintenance'}
                  icon={HiOutlineCog}
                  as='div'
                >
                  Maintenance
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=reports'>
                <Sidebar.Item
                  active={tab === 'reports'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Reports
                </Sidebar.Item>
              </Link>
              <Sidebar.Item
                icon={HiArrowSmRight}
                className='cursor-pointer'
                onClick={handleSignout}
              >
                Sign Out
              </Sidebar.Item>
            </>
          )}
          {currentUser && currentUser.role === 'staff' && (
            <>
              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item
                  active={tab === 'dash' || !tab}
                  icon={HiChartPie}
                  as='div'
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=profile'>
                <Sidebar.Item
                  active={tab === 'profile'}
                  icon={HiUser}
                  label='Staff'
                  labelColor='dark'
                  as='div'
                >
                  Profile
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=payments'>
                <Sidebar.Item
                  active={tab === 'payments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Payments
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=voucher'>
                <Sidebar.Item
                  active={tab === 'voucher'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Vouchers
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=perdm'>
                <Sidebar.Item
                  active={tab === 'perdm'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Perdm
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=timesheet'>
                <Sidebar.Item
                  active={tab === 'timesheet'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Timesheet
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=form'>
                <Sidebar.Item
                  active={tab === 'form'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Forms
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=vaccibox'>
                <Sidebar.Item
                  active={tab === 'vaccibox'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Vaccibox
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=maintenance'>
                <Sidebar.Item
                  active={tab === 'maintenance'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Maintenance
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=reports'>
                <Sidebar.Item
                  active={tab === 'reports'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Reports
                </Sidebar.Item>
              </Link>
              <Sidebar.Item
                icon={HiArrowSmRight}
                className='cursor-pointer'
                onClick={handleSignout}
              >
                Sign Out
              </Sidebar.Item>
            </>
          )}
          {currentUser && currentUser.role === 'user' && (
            <>
              <Link to='/dashboard?tab=profile'>
                <Sidebar.Item
                  active={tab === 'profile'}
                  icon={HiUser}
                  label='User'
                  labelColor='dark'
                  as='div'
                >
                  Profile
                </Sidebar.Item>
              </Link>
              <Sidebar.Item
                icon={HiArrowSmRight}
                className='cursor-pointer'
                onClick={handleSignout}
              >
                Sign Out
              </Sidebar.Item>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    
  );
}