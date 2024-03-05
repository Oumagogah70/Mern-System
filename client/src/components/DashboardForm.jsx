import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Table,Button,TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function DashboardForm() {
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
        <Link to={"/form"}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Application Form
          </Button>
        </Link>
       </div>
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Sent To</Table.HeadCell>
              <Table.HeadCell>Sent By</Table.HeadCell>
              <Table.HeadCell>Form Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
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
