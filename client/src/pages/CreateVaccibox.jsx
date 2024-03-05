import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Label, Select } from 'flowbite-react';


export default function CreateVaccibox() {
    const navigate = useNavigate()
    const currentUser = useSelector((state)=> state.user.currentUser)
    const [formData, setFormData] = useState({
        createdBy:currentUser?.username || "",
        serialNumber:"",
        fridgeId:"",
        warranty:"",
        status:""
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prevState)=>{
            const newData =  {
                ...prevState,
                [name] : value
            }

            console.log("New form data:", newData);
            return newData;
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await fetch("/api/vaccibox/createvaccibox",{
                method:"POST",
                headers :{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    createdBy:formData.createdBy,
                    serialNumber:formData.serialNumber,
                    warranty:formData.warranty,
                    status: formData.status,
                    fridgeId: formData.fridgeId
                })
            })
            if (response.ok){
                alert('Vaccibox created succefully')
                setFormData({
                    createdBy:currentUser?.username || "",
                    serialNumber:"",
                    fridgeId:"",
                    warranty:"",
                    status:""
                });
                navigate('/dashboard?tab=vaccibox')
                
            }

        } catch (error) {
            
        }
    } 
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create Vaccibox</h1>
      <form onSubmit={handleSubmit}>
        
        
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Serial Number:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <input
            type="number"
            name="fridgeId"
            value={formData.fridgeId}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Attach Fridge Id:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Warranty:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <Select 
          name='status'
          value={formData.status}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required>
            <option>active</option>
            <option>passive</option>
          </Select>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Status:
          </label>
          
        </div>
       
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Submit</button>
      </form>
    </div>
  )
}
