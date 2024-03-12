import { FaTimes } from "react-icons/fa";
import DataTable from 'react-data-table-component';

const Table = ({data =[], empty_message ='No records found yet', onRemove}) => {
  const customStyles ={
    headCells: {
      style: {
        backgroundColor: 'rgb(37 99 235)',
        color: 'white',
        padding: '15px 20px'
      }
    }
  }
  const toTitleCase =text =>{
    text =text.trim().replace('_', ' ');
    const words =text.split(" ").
      map(word =>`${word[0].toUpperCase()}${word.slice(1,)}`).
      join(' ');
      return words;
  }
 
  const columns = data.length? Object.keys(data[0]).map(key =>({name: toTitleCase(key), selector: row =>row[key]})): [];
  if(columns.length){
    columns.push({
      name: "Action",
      cell: row => <button onClick={() =>onRemove(row)}><FaTimes className="hover:text-red-400 transition-all" /></button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
  })
  }
  return data.length? (<DataTable data={data} columns={columns} dense pagination ={data.length >=10} customStyles={customStyles}/>): (<div className='h-full flex items-center justify-center'><p className='text-gray-400 font-500'>{empty_message}</p></div>)
}
export default Table;