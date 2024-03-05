import React from 'react'
import ReactQuill from 'react-quill'
import { Alert,Button,FileInput,Select, TextInput } from 'flowbite-react'

export default function CreateMaintance() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Vaccibox Maintenance</h1>
      <form className='flex flex-col gap-4' >
      {/* onSubmit={handleSubmit} */}
        <div className='flex flex-col  sm:flex-row justify-around'>
        <Select
            // onChange={(e) =>
            //   setFormData({ ...formData, category: e.target.value })
            // }
          >
            <option value='uncategorized'>Select Vaccibox</option>
            <option value='javascript'>Production</option>
            <option value='reactjs'>Maintanance</option>
            
          </Select>
          <Select
            // onChange={(e) =>
            //   setFormData({ ...formData, category: e.target.value })
            // }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>Production</option>
            <option value='reactjs'>Maintanance</option>
            
          </Select>
          <Select
            // onChange={(e) =>
            //   setFormData({ ...formData, category: e.target.value })
            // }
          >
            <option value='uncategorized'>Solution</option>
            <option value='javascript'>Yes</option>
            <option value='reactjs'>No</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            // onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            // onClick={handleUpdloadImage}
            // disabled={imageUploadProgress}
          >
            {/* {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )} */}
          </Button>
        </div>
        {/* {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )} */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          // onChange={(value) => {
          //   setFormData({ ...formData, content: value });
          // }}
        />
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            // onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            // onClick={handleUpdloadImage}
            // disabled={imageUploadProgress}
          >
            {/* {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )} */}
          </Button>
        </div>
         <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          // onChange={(value) => {
          //   setFormData({ ...formData, content: value });
          // }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Submit
        </Button>
        {/* {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )} */}
      </form>
    </div>
  )
}
