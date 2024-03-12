import {API_URL} from '.';

export const add_voucher =async details=>{
    try {

        const res = await fetch(`${API_URL}/voucher/create`, {
          method: 'post',
          body: JSON.stringify(details),
          headers: {
            'Content-type': 'application/json'
          }
        });
        const {message} = await res.json();
        const status_code =res.status;
        const payload ={type: status_code ==201 || status_code ==200? 'success': 'error', message};
        console.log(payload)
        return payload;
        
      } catch ({message}) {
        return {type: 'error', message} 
      }
}