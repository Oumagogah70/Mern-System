import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Table, TextInput, Button, TableCell } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashboardPerdm() {
  const { currentUser } = useSelector((state) => state.user);
  const [perdms, setPerdm] = useState([]);
  
  useEffect(() => {
    const fetchPerdms = async () => {
      try {
        const res = await fetch("/api/perdm/getperdms", {
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
        setPerdm(data.perdms);
      } catch (error) {
        console.error("Fetch error:", error); // Log the fetch error
      }
    };
  
    if (currentUser?.role === 'admin' || currentUser?.role === 'staff') {
      fetchPerdms();
    }
  }, [currentUser?.role]);
  
  console.log(currentUser)
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
        <Link to={"/perdm"}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Add Perdm
          </Button>
        </Link>
      </div>
      <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date created</Table.HeadCell>
            <Table.HeadCell>Perdm To</Table.HeadCell>
            <Table.HeadCell>Perdm From</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          {perdms.map((perdm) => (
            <Table.Body key={perdm._id}>
              <Table.Row>
                <Table.Cell>
                  {new Date(perdm.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{perdm.sentTo.username}</Table.Cell>
                <Table.Cell>{perdm.sentBy.username}</Table.Cell>
                <Table.Cell>{perdm.itemName}</Table.Cell>
                <Table.Cell>Ksh: {perdm.totalPrice}/=</Table.Cell>
                <Table.Cell>
                <span
                    className={`px-2 py-1 rounded ${
                      perdm.status === "pending"
                        ? "bg-yellow-300"
                        : perdm.status === "approved"
                        ? "bg-blue-400"
                        : perdm.status === "declined"
                        ? "bg-red-400"
                        : "bg-gray-300"
                    } text-white text-opacity-90 text-md`}
                  >
                    {perdm.status.charAt(0).toUpperCase() +
                      perdm.status.slice(1)}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-perdm/${perdm._id}`}>
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
  );
}
