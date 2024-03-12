import {API_URL} from '.';

export const fetch_users =async ()=>{
    try {
        const res = await fetch(`${API_URL}/perdm/getusersperdm`);
        const data= await res.json();
        return {data: [...data].map(({names, _id}) =>({names, _id}))};
        
      } catch ({message}) {
        return {message}
      }
}

export const fetch_user =async id =>{

}