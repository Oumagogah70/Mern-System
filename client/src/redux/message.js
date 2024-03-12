import twilio from 'twilio';

const SendMessage =  async (body, from, to) =>{
    const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
    const authToken = import.meta.env.TWILIO_AUTH_TOKEN
    const client = twilio(accountSid,authToken);
    
    try {
        const message = await client.messages.create({
            body:body,
            from: import.meta.env.TWILIO_NUMBER,
            to:to,
        });
        console.log(message.sid);
        return message
    } catch (error) {
        console.error('Error sending message:', error)
        throw error
        
    }
}

export default SendMessage;