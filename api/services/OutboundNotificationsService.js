require('dotenv/config');
const axios =require('axios');
const {HTTP_200_OK, HTT_500_INTERNAL_SERVER_ERROR} =require('../utils/http_status_codes.js');

class OutboundNotificationsService{

    static sendsmsNotifications =async ({phone, message}) =>{
        try {
            const engine =axios.create({baseURL:process.env.INFOBIP_BASE_URL, headers:{
                Authorization: `App ${process.env.INFOBIP_API_KEY}`,
                Accept:'application/json',
                'Content-Type':'application/json',
            }});

            await engine.post('/sms/2/text/advanced', { 
                messages:[ { destinations:[{to: phone}], from: "InfoSMS", text: message }
            ]
            });

            return {status: HTTP_200_OK, message: 'Sent'}

        } catch ({response, message}) {
            return response? {status: response.status, message: response.data?.message || response.data}: {status: HTT_500_INTERNAL_SERVER_ERROR, message};
        }
    }

    static sendEmailNotifications =async payload =>{
        // TODO: Implement nodemailer services here
    }
}

module.exports =OutboundNotificationsService;