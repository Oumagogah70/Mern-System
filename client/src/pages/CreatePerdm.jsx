import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Label, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";


export default function CreatePerdm() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    sentTo: "",
    sentBy: currentUser?.username || "",
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemQuantity: "",
    totalPrice: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/perdm/getusersperdm`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newData = {
        ...prevState,
        [name]: value,
      };
      if (name === "itemPrice" || name === "itemQuantity") {
        const itemPrice = parseFloat(newData.itemPrice);
        const itemQuantity = parseFloat(newData.itemQuantity);
        newData.totalPrice =
          !isNaN(itemPrice) * !isNaN(itemQuantity)
            ? itemPrice * itemQuantity
            : "";
      }
      console.log("New form data:", newData); // Log the new form data
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
                   
      const response = await fetch("/api/perdm/createperdm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sentBy: formData.sentBy,
          sentTo: formData.sentTo,
          itemName: formData.itemName,
          itemDescription: formData.itemDescription,
          itemPrice: parseFloat(formData.itemPrice),
          itemQuantity: parseFloat(formData.itemQuantity),
          totalPrice: parseFloat(formData.totalPrice),
        }),
      });

      if(response.ok){
        alert('Perdm successful');
        setFormData({
          sentTo: "",
          sentBy: currentUser?.username || "",
          itemName: "",
          itemDescription: "",
          itemPrice: "",
          itemQuantity: "",
          totalPrice: "",
        });
        navigate('/dashboard?tab=perdm')

      }
      else{
        const errData = await response.json();
        alert('failed to create perdm')
      }
      
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create Per Diem</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <Select
            name="sentTo"
            value={formData.sentTo || ""}
            onChange={handleChange}
            
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            {users.map((user) => (
              <option key={user._id} value={user.name}>
                {user.username}
              </option>
            ))}
          </Select>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Person:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Title:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            type="text"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Description:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="itemPrice"
            value={formData.itemPrice}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Unit Cost:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="itemQuantity"
            value={formData.itemQuantity}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Number:
          </label>
        </div>
        <div className="mb-5">
          <label>Total Cost:</label>
          <p>Ksh: {formData.totalPrice ? formData.totalPrice.toFixed(2) : ""} /=</p>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Submit</button>
      </form>
    </div>
  );
}
