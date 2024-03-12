import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config()


// const response =await fetch(`${process.env.INFOBIP_BASE_URL}sms/2/text/advanced`, {
//     method: 'post',
//     body: JSON.stringify({
//         messages: [
//             {
//                 destinations: [{to: phone,},],
//                 from: "InfoSMS",
//                 text: `Your Verification PIN is: ${generateOTP()}`
//             }
//         ]
//     }),
class InfoBipAPIService{
    #api;
    constructor(){
        this.#api = axios.create({baseURL:process.env.INFOBIP_BASE_URL,headers:{
            Authorization: `App ${process.env.INFOBIP_API_KEY}`,
            Accept:'application/json',
            'Content-Type':'application/json',
        }});
    }

    sendSMS = async(req,res) =>{
        try {
            const {phone} = req.body;
            const {message} = req.body;
            const response = await this.#api.post('/sms/2/text/advanced',{
                messages:[
                    {
                        destinations:[{to: phone}],
                        from: "InfoSMS",
                        text: message
                    }
                ]
            });
            const {messages} = await response.data;
            const{to} = messages[0];
            return res.status(200).json({message: `Sent to ${to}`});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:error});
        }
    }
}

export default InfoBipAPIService;