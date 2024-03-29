import {useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotificationComponent = ({label, toast_type}) => {
    const options ={
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    }
    useEffect(() =>{
      
      const notify =toast?.[toast_type] || toast;
      notify(label, options);
    }, []);
  return (
        <ToastContainer/>
  )
}

export default ToastNotificationComponent;