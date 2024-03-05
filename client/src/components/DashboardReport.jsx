import React,{useState,useEffect} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Table,Button,TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function DashboardReport() {

  const {currentUser} = useSelector((state)=>state.user);
  const [reports, setReports] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');

  useEffect(()=>{
    const fetchReports = async()=>{
      try {
        const res = await fetch("/api/report/getreports",{
          method: "GET",
          headers:{
            "Content-Type":"application/json",
          },
        });
        if(!res.ok){
          throw new Error("Failed to fetch data");

        }
        const data = await res.json();
        setReports(data.reports)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    if(currentUser?.role === 'admin' || currentUser?.role === 'staff'){
      fetchReports();
    }
  },[currentUser?.role]);

  const removeTags = (content) => {
    return content.replace(/<p>/g, "").replace(/<\/p>/g, "");
  };

//   const filteredReports = reports.filter((report) =>
//   report.title.toLowerCase().includes(searchTerm.toLowerCase())
// );
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
        <Link to={"/reports"}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Create Report
          </Button>
        </Link>
       </div>
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Sent To</Table.HeadCell>
              <Table.HeadCell>Sent By</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {reports.map((report)=>(
              <Table.Body key={report._id}>
                <Table.Row>
                  <Table.Cell>{new Date(report.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{report.sentTo.username}</Table.Cell>
                  <Table.Cell>{report.sentBy.username}</Table.Cell>
                  <Table.Cell>{report.title}</Table.Cell>
                  <Table.Cell>{removeTags(report.content)}</Table.Cell>
                  <Table.Cell>View</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          
        </>
      
     
    
    </div>
  )
}
