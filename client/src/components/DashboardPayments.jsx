import React,{useEffect, useState} from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { Table, TextInput, Button, TableCell } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardPayments() {
    const { currentUser } = useSelector((state) => state.user);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        const fetchPayments = async () => {
          try {
            const res = await fetch("/api/payments/getpayments", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!res.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            // console.log("Data:", data);
            setPayments(data.payments);
          } catch (error) {
            console.error("Fetch error:", error); // Log the fetch error
          }
        };
      
        if (currentUser?.role === 'admin' || currentUser?.role === 'staff') {
          fetchPayments();
        }
      }, [currentUser?.role]);
  return (
    <div className="mt-2 space-y-3 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      <div className="flex justify-between max-w-full   ">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to={"/payments"}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Make Payments
          </Button>
        </Link>
      </div>
      <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date created</Table.HeadCell>
            <Table.HeadCell>Payments To</Table.HeadCell>
            <Table.HeadCell>Payments From</Table.HeadCell>
            <Table.HeadCell>Mode of Payment</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          {payments.map((payment) => (
            <Table.Body key={payment._id}>
              <Table.Row>
                <Table.Cell>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{payment.sentTo.username}</Table.Cell>
                <Table.Cell>{payment.sentBy.username}</Table.Cell>
                <Table.Cell>{payment.type}</Table.Cell>
                <Table.Cell>Ksh: {payment.amount}/=</Table.Cell>
                <Table.Cell>
                <span
                    className={`px-2 py-1 rounded ${
                        payment.status === "pending"
                        ? "bg-yellow-300"
                        : payment.status === "approved"
                        ? "bg-blue-400"
                        : payment.status === "declined"
                        ? "bg-red-400"
                        : "bg-gray-300"
                    } text-white text-opacity-90 text-md`}
                  >
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/${payment._id}`}>
                    <Button
                      type="button"
                      gradientDuoTone="purpleToPink"
                      className="w-full"
                    >
                      View
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </>
    </div>
  )
}
