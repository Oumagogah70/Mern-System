const SpinLoader = ({message}) => {
    return (
      <div className='flex items-center gap-4'>
          <div className='h-[20px] w-[20px] border-4 border-gray-500 border-dotted rounded-full animate-spin'></div>
          <p className='text-gray-400'>{message || 'Please Wait ...'}</p>
      </div>
    )
  }
  
  export default SpinLoader;