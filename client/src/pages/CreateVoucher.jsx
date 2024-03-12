import { Helmet } from 'react-helmet';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetch_users } from "../api/user-api";
import { add_voucher } from "../api/vouchers-api";
import { Form, Table, Loader, Toast } from "../components";

export default function CreateVoucher() {

  const navigate = useNavigate();
  const [toast, setToast] =useState(null);
  const [items, setItems] = useState([]);
  const [adding, setAdding] =useState(false);
  const [customers, setCustomers] = useState([]);
  const [resetForm, setResetForm] =useState(false);
  const [submiting, setSubmiting] =useState(false);
  const [displayItems, setDisplayItems] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const voucherFields =[
    {name: 'name', type: 'text', label: 'Item', required: true, placeholder: 'Item name', validations: {required: {value: true, message: "Item name must be provided"}}},
    {name: 'price', type: 'number', label: 'Price', required: true, placeholder: 'Item unit price', validations: {required: {value: true, message: "Item price is required"}}},
    {name: 'quantity', type: 'number', label: 'Quantity', required: true, placeholder: 'Number of items', validations: {required: {value: true, message: "Please provide items count"}}},
    {name: 'description', type: 'textarea', label: 'Description', required: true, placeholder: 'Short a description about item', validations: {required: {value: true, message: "Item description is required"}}},
  ]
  const recipientFields =[
    {name: 'recipient_id', type: 'select', choices: customers, placeholder: 'Select recipient', required: true, validations: {required: {value: true, message: "Please select recipient"}}},
  ];

  useEffect(() => {
    (async () =>{
      const {message, data} =await fetch_users();
      if(!message){data.sort(); setCustomers(data.map(({_id, names}) =>({value: _id, text: names})));}
      else console.log(message);
    })();
    return () =>{
      setToast(null); 
    }
  }, []);


  const removeItem = item => setDisplayItems([...displayItems.filter(row => row !=item)])
  const calculateItemTotal = ({price, quantity}) => price * quantity;

  const addItemToList = async values =>{
    setAdding(true)
    setItems([...items, values]);
    setDisplayItems([...displayItems, values]);
    setResetForm(true);
    setAdding(false)
  };


  const handleCreateVoucher = async values => {
    setToast(null);
    setSubmiting(true);
    try {
      const data ={sender_id: currentUser?._id, payload: items, ...values};
      const {type, message} =await add_voucher(data); 
      setToast({type, message});
      if(type =='success') {
        setItems([]);
        navigate('/dashboard', {replace: true});
      }
    } catch ({message}) {
      console.error("Failed to save items", error);
    }
    setSubmiting(false);
  };

  return (
    <>
      <Helmet>
        <title>Add Voucher</title>
      </Helmet>
      <h2 className='text-center py-5 text-3xl uppercase font-[700]'>Create Voucher</h2>
      <div className="px-12 py-5 grid grid-cols-2 gap-8">
        <Form onSubmit={addItemToList} inputs={voucherFields} setResetForm={setResetForm} resetForm={resetForm}>
          {adding? (<Loader />) : (<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Item</button>)}
        </Form>
        <div className="px-8">
          {displayItems.length? (<h2 className='uppercase pb-5 text-lg font-[700]'>Summary</h2>): null}
          <Table empty_message='No items added yet' data={displayItems} onRemove={removeItem}/>
          {displayItems.length? (<div className="pt-5">
            <h2 className='font-[600] uppercase text-lg pb-5'>Total Cost: {displayItems.reduce((accumulator, item) =>{
              return accumulator +calculateItemTotal(item)
            }, 0)}</h2>
            <Form inputs={recipientFields} onSubmit={handleCreateVoucher}>
            {submiting? (<Loader message ="Saving ..."/>) :(<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>)}
          </Form></div>): <></>}
        </div>
      </div>
      {toast?(<Toast toast_type={toast.type} label={toast.message}/>): (<></>)}
    </>
  );
}
