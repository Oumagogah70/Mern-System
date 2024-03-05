import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import { Table,TextInput,Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardMaintenance() {
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
        <Link to={"/maintenance"}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Vaccibox Maintenance
          </Button>
        </Link>
       </div>
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Previous image</Table.HeadCell>
              <Table.HeadCell>Current image</Table.HeadCell>
              <Table.HeadCell>Previous States</Table.HeadCell>
              <Table.HeadCell>Current States</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Solved</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            
          </Table>
          
        </>
      
     
    
    </div>
  )
}
