import React, { useState, useEffect } from 'react';
import { TextInput, Button, Table } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';

export default function DashboardTime() {
    const { currentUser } = useSelector((state) => state.user);
    const [timesheetRecords, setTimeSheetRecords] = useState([]);
    const [lastSignInTime, setLastSignInTime] = useState(localStorage.getItem('lastSignInTime'));

    useEffect(() => {
        const fetchTimeSheetRecords = async () => {
            try {
                const response = await fetch('/api/timesheet/gettimesheet');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setTimeSheetRecords(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTimeSheetRecords();
    }, []);

    const handleSignIn = async () => {
        const currentTime = new Date();
        if (!lastSignInTime || (currentTime - new Date(lastSignInTime)) / (1000 * 60 * 60) >= 24) {
            try {
                const res = await fetch('/api/timesheet/createtimesheetin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        time: currentTime,
                        user: currentUser
                    })
                });
                if (res.ok) {
                    setLastSignInTime(currentTime.toISOString());
                    localStorage.setItem('lastSignInTime', currentTime.toISOString());
                    alert('Sign-in time saved successfully!');
                } else {
                    throw new Error('Failed to save sign-in time');
                }
            } catch (error) {
                console.error('Error saving sign-in time', error);
                alert('Failed to save sign-in time');
            }
        } else {
            alert('You have already recorded your sign-in time within the last 24 hours.');
        }
    };

    const handleSignOut = async () => {
        const currentTime = new Date();
        try {
            const res = await fetch('/api/timesheet/createtimesheetout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    time: currentTime,
                    user: currentUser
                })
            });
            if (res.ok) {
                alert('Sign-out time saved successfully');
            } else {
                throw new Error('Failed to save sign-out time');
            }
        } catch (error) {
            console.error('Error saving sign-out time:', error);
            alert('Failed to save sign-out time');
        }
    };

    return (
        <div className=' max-w-full mt-2 space-y-3 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 '>
            <div className="flex gap-10  justify-between max-w-full  ">
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                />
                <Button
                    type="button"
                    gradientDuoTone="purpleToPink"
                    className="w-full"
                    onClick={handleSignIn}
                    disabled={lastSignInTime && (new Date() - new Date(lastSignInTime)) / (1000 * 60 * 60) < 24}
                >
                    Time In
                </Button>
                <Button
                    type="button"
                    gradientDuoTone="purpleToPink"
                    className="w-full"
                    onClick={handleSignOut}
                    disabled={lastSignInTime && (new Date() - new Date(lastSignInTime)) / (1000 * 60 * 60) < 24}
                >
                    Time Out
                </Button>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Time</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>User</Table.HeadCell>
                </Table.Head>
                {timesheetRecords.map((timesheet) => (
                    <Table.Body key={timesheet._id}>
                        <Table.Row>
                            <Table.Cell>{new Date(timesheet.time).toDateString()}</Table.Cell>
                            <Table.Cell>{new Date(timesheet.time).toTimeString().slice(0, 8)}</Table.Cell>
                            <Table.Cell>{timesheet.type}</Table.Cell>
                            <Table.Cell>{timesheet.user.username}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
    );
}
