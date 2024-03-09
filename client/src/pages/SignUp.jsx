import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {Label,TextInput,Button, Spinner,Alert } from 'flowbite-react'
// import nodemailer from 'nodemailer';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // const sendEmail = async (email, password) => {
  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'gordon.intern@dropaccess.org',
  //       pass: '8244@GOGAH.DATA',
  //     },
  //   });

  //   const mailOptions = {
  //     from: 'gordon.intern@dropaccess.org',
  //     to: email,
  //     subject: 'Account Created Successfully',
  //     text: `Your account has been created successfully. Your password is: ${password}`,
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.error('Error sending email:', error);
  //     } else {
  //       console.log('Email sent:', info.response);
  //     }
  //   });
  // };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.names || !formData.contact|| !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        // sendEmail(formData.email, formData.password);
        navigate('/dashboard?tab=users');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  
  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* right */}

      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} > 
        
          <div>
            <Label value='Your username' />
            <TextInput
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your names' />
            <TextInput
              type='text'
              placeholder='names'
              id='names'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your contacts' />
            <TextInput
              type='number'
              placeholder='contact'
              id='contact'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your email' />
            <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your password' />
            <TextInput
              type='password'
              placeholder='Password'
              id='password'
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone='purpleToPink'
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Sign Up'
            )}
            
          </Button>
        
        </form>
        
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  </div>
  )
}
