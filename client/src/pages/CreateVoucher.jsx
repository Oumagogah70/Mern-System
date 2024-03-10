import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Select} from "flowbite-react";
import { useSelector } from "react-redux";
// import dotenv from 'dotenv'
// dotenv.config();
// import twilio from 'twilio';



export default function CreateVoucher() {

  const currentUser = useSelector((state)=> state.user.currentUser)
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [person, setPerson] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState('')
  const navigate = useNavigate()
  
  
  

  useEffect(()=>{
    const fetchUsers = async()=>{
      try {
        const res = await fetch(`/api/perdm/getusersperdm`);
        const data = await res.json();
        setPerson(data);
        
      } catch (error) {
        console.error(error);
        
      }
    };
    fetchUsers();
  },[])
  const addItemToList = () => {
    if (itemName && itemPrice > 0 && itemQuantity > 0) {
      const newItem = {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
        description: itemDescription
      };
      setItems([...items, newItem]);
      setTotalPrice((prevPrice) => prevPrice + itemPrice * itemQuantity);
      setTotalQuantity((prevQuantity) => prevQuantity + itemQuantity);
      setItemName("");
      setItemDescription("");
      setItemPrice(0);
      setItemQuantity(0);
    } else {
      alert("Please enter valid item details.");
    }
  };

  const removeItem = (indexToRemove) => {
    const updatedItems = items.filter((_, index) => index !== indexToRemove);
    setItems(updatedItems);
    // Recalculate total price and total quantity
    const updatedTotalPrice = updatedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const updatedTotalQuantity = updatedItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setTotalPrice(updatedTotalPrice);
    setTotalQuantity(updatedTotalQuantity);
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };


  const sendSMS = async(contactNumber, smsBody)=>{
   
    // const client = twilio(accountSid,authToken)
    client.messages.create({
        from:'+12133772696',
        body:smsBody,
        to:`+254${contactNumber.substring(1)}`,
      })
      .then(message => console.log(message.sid));
     
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const data = {
            items: items,
            itemPrice: itemPrice,
            itemQuantity: itemQuantity,
            totalPrice: totalPrice,
            totalQuantity: totalQuantity,
            sentTo: selectedPerson,
            sentBy: currentUser?.username || " "
          };
          console.log(data)
          const resUser = await fetch(`/api/user/${selectedPerson}`);
          const userData = await resUser.json();
          const contactNumber = userData.contact;
          console.log(contactNumber)
        const res = await fetch('/api/voucher/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })
        
        if(res.ok){
          // Send SMS notification
          const smsBody = `Your voucher has been created with items: ${items.map(item => `${item.name} (${item.quantity} x ${item.price})`).join(', ')}. Total Price: ${totalPrice}`;
          await sendSMS(contactNumber,smsBody)
            //handle succesful response
            alert('Voucher saved');
            setItems([]);
            setTotalPrice(0);
            setTotalQuantity(0);
            setPerson('');

            //Redirect to dashboard
            navigate('/dashboard?tab=voucher')
        }
        else{
            //handle error response
            const errData = await res.json();
            alert('failed to add voucher');
        }
    } catch (error) {
        console.error('Failed to save items', error);
        alert('Failed to save tems.please try again later')
        
    }
    setPerson([]);
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create Voucher
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
        <Select
            name="userName"
            value={selectedPerson}
            onChange={(e)=> setSelectedPerson(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            {person.map((user) => (
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
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Item Name:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Item Description:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Item Price:
          </label>
          <input
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(parseFloat(e.target.value))}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Item Quantity:
          </label>
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(parseInt(e.target.value))}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <button
          type="button"
          onClick={addItemToList}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Item
        </button>
        <div className="relative overflow-x-auto">
        <h5 className="text-center text-3xl my-7 font-semibold">Items List</h5>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Item Name
                </th><th scope="col" className="px-6 py-3 ">
                  Item description
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Item Price
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Item Quantity
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{calculateItemTotal(item)}</td>
                  <td>
                    {" "}
                    <button type="button" onClick={() => removeItem(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
         
        </div>
        <div>
          <p>Total Price: {totalPrice}</p>
          <p>Total Quantity: {totalQuantity}</p>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Submit</button>
      </form>
    </div>
  );
}
