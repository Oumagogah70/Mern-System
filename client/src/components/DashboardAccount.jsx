import React,{useState,useEffect} from 'react'
import { Table,Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardAccount() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await fetch('/api/status/getstatus');
        const data = await response.json()
        const combined = [
          ...data.approvedVouchers.map(voucher => ({...voucher,type:'Voucher'})),
          ...data.approvedPerdms.map(perdm =>({...perdm, type:'Perdm'})),
          ...data.approvedPayments.map(payments =>({...payments, type:'Payments'}))
        ]
        console.log(combined)
        setCombinedData(combined);
      } catch (error) {
        console.error("Error fetching data:",error)
      }
    };
    fetchData();
  },[]);
  
  return (
    <div className="mt-2 space-y-3 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {combinedData.length > 0 ?(
        <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date created</Table.HeadCell>
            <Table.HeadCell>Sent To</Table.HeadCell>
            <Table.HeadCell>Sent By</Table.HeadCell>
            <Table.HeadCell>Reciept</Table.HeadCell>
            <Table.HeadCell>Paybill</Table.HeadCell>
            <Table.HeadCell>A/C No:</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Total Amount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          {combinedData.map((item) => (
            <Table.Body key={item._id}>
              <Table.Row>
                <Table.Cell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{item.sentTo.username}</Table.Cell>
                <Table.Cell>{item.sentBy.username}</Table.Cell>
                <Table.Cell>{item.sentBy.contact || item.phoneNumber} </Table.Cell>
                <Table.Cell>{item.paybillNumber || item.tillNumber}</Table.Cell>
                <Table.Cell>{item.accountNumber}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>Ksh: {item.totalPrice}/=</Table.Cell>
                <Table.Cell>
                <span
                    className={`px-2 py-1 rounded bg-blue-400 text-white text-opacity-90 text-md`}
                  >
                    {item.status.charAt(0).toUpperCase() +
                      item.status.slice(1)}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link>
                    <Button
                      type="button"
                      gradientDuoTone="purpleToPink"
                      className="w-full"
                    >
                      Pay
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </>
      ):(
        <p>You have no voucher or per diem approved yet</p>
      )}
      
    </div>
  )
}
