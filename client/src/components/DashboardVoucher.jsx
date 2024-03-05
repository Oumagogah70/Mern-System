import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Table, TextInput, Button, List } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardVoucher() {
  const { currentUser } = useSelector((state) => state.user);
  const [vouchers, setVouchers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await fetch(`/api/voucher/getvouchers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();

        setVouchers(data.vouchers);
      } catch (error) {}
    };
    if (currentUser?.role === "admin" || currentUser?.role === "staff") {
      fetchVouchers();
    }
  }, [currentUser?.role]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vouchers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatus = async (voucherId) => {
    try {
      const res = await fetch(`/api/voucher/${voucherId}/updatevouchers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Approved" }),
      });
      if (res.ok) {
        setVouchers((prevVoucher) => {
          return prevVoucher.map((voucher) => {
            if (voucher._id === voucherId) {
              return { ...voucher, status: "Approved" };
            }
            return voucher;
          });
        });
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <div className="mt-4 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="flex justify-between max-w-full  ">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to={"/voucher"}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Add Voucher
          </Button>
        </Link>
      </div>
      <>
        <Table hoverable className="shadow-md mt-4 max-w-full">
          <Table.Head>
            <Table.HeadCell>Date created</Table.HeadCell>
            <Table.HeadCell>Voucher To</Table.HeadCell>
            <Table.HeadCell>Voucher By</Table.HeadCell>
            <Table.HeadCell>Total Price</Table.HeadCell>
            <Table.HeadCell>Total Quantity</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          {vouchers.map((voucher) => (
            <Table.Body className="divide-y" key={voucher._id}>
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={voucher._id}
              >
                <Table.Cell>
                  {new Date(voucher.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{voucher.sentTo.username}</Table.Cell>
                <Table.Cell>{voucher.sentBy.username}</Table.Cell>
                <Table.Cell>Ksh: {voucher.totalPrice}/=</Table.Cell>
                <Table.Cell>{voucher.totalQuantity}</Table.Cell>

                <Table.Cell>
                  <span
                    className={`px-2 py-1 rounded ${
                      voucher.status === "pending"
                        ? "bg-yellow-300"
                        : voucher.status === "approved"
                        ? "bg-blue-400"
                        : voucher.status === "declined"
                        ? "bg-red-400"
                        : "bg-gray-300"
                    } text-white text-opacity-90 text-md`}
                  >
                    {voucher.status.charAt(0).toUpperCase() +
                      voucher.status.slice(1)}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-voucher/${voucher._id}`}>
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
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2"
          >
            Previous
          </Button>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentItems.length < itemsPerPage || !showMore}
          >
            Next
          </Button>
        </div>
      </>
    </div>
  );
}
