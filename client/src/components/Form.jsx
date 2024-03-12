import {useForm} from 'react-hook-form';

const Form = ({inputs =[], title, onSubmit, resetForm, setResetForm, children}) => {

  const {register, reset, handleSubmit, formState: {errors}} =useForm();
  const handleFormSubmission =async values =>await onSubmit(values);
  if(resetForm){ reset(); setResetForm(false); }

  return (
    <form onSubmit={handleSubmit(handleFormSubmission)}>
      {title && (<h2 className='text-center text-3xl my-7 font-semibold'>{title}</h2>)}
      {inputs.map(({type, label, name, placeholder, rows, choices, className ='', defaultValue ='', validations ={}, required =true}, index) =>(
         <div className={`relative z-0 w-full mb-7 group ${className}`} key={index}>  
            {label? <label htmlFor ={name} className={`mb-1 block text-base text-gray-600 antialiased font-600`}>{label}{required &&<span className='text-rose-500'>&nbsp;*</span>}</label>: null}
            {type === 'textarea'? (
              <textarea rows={rows} placeholder ={placeholder || ''} {...register(name, validations)} className={`p-3 w-full focus:outline-none appearence-none border rounded focus:shadow-sm focus:shadow-blue-100 resize-none ${errors[name]? 'border-rose-600 transition-border ease-linear duration-100' : ''}`}></textarea>
              ): type ==='select'? (<select defaultValue={defaultValue} {...register(name, validations)} className='capitalize cursor-pointer px-3 py-2 w-full focus:outline-none appearence-none border rounded focus:shadow-sm focus:shadow-blue-100 resize-none'>
                {placeholder && (<option value='' disabled>{placeholder}</option>)}
                {choices.map(({value, text}, index) =><option value ={value} key={`${text}-${index}`}>{text}</option>)}
                </select>)
              :(<input type={type} placeholder={placeholder || ''} {...register(name, validations)} className={`px-3 py-2 w-full focus:outline-none appearence-none border rounded focus:shadow-sm focus:shadow-blue-100 ${errors[name]?'border-rose-600 transition-border ease-linear duration-100': ''}`}/>)} 
            {errors[name] && <small className='transition-all easy-linear duration-300 block absolute -bottom-5 text-rose-600 text-sm font-sans antialiased'>{errors[name].message? errors[name].message: errors[name]}</small>}
        </div>
      ))}
      {children}
    </form>
  )
}

export default Form;