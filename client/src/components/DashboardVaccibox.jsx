import React,{useState,useEffect} from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { Table, TextInput, Button } from 'flowbite-react'
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashboardVaccibox() {
  const {currentUser} = useSelector((state) => state.user);
  const [vacciboxs, setVacciboxs] = useState([]);

  useEffect(()=>{
    const fetchVacciboxs = async()=>{
      try {
        const res = await fetch('/api/vaccibox/getvaccibox',{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
          },
        });
        if(!res.ok){
          throw new Error("Failed to data");
        }
        const data = await res.json()
        setVacciboxs(data.vacciboxs)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    if(currentUser?.role ==='admin' || currentUser?.role ==='staff'){
      fetchVacciboxs();
    }
  },[currentUser?.role])
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
        <Link to={"/vaccibox"}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Create Vaccibox
          </Button>
        </Link>
      </div>
      <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date created</Table.HeadCell>
            <Table.HeadCell>Serial Number</Table.HeadCell>
            <Table.HeadCell>Attached Fridge Id</Table.HeadCell>
            <Table.HeadCell>Created By</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          {vacciboxs.map((vaccibox)=>(
            <Table.Body key={vaccibox._id}>
              <Table.Row>
                <Table.Cell>{new Date(vaccibox.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{vaccibox.serialNumber}</Table.Cell>
                <Table.Cell>{vaccibox.fridgeId}</Table.Cell>
                <Table.Cell>{vaccibox.createdBy.username}</Table.Cell>
                <Table.Cell>{vaccibox.status}</Table.Cell>
                <Table.Cell>
                <Link to={`//${vaccibox._id}`}>
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
