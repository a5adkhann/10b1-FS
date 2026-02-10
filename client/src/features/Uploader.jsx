import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const Uploader = () => {

  const [image, setImage] = useState(null);


  const handleFileUpload = async(e) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append("myImage", image);
      const response = await axios.post("http://localhost:3000/api/fileupload", formData);
      console.log(response);
      toast.success(response.data.message);
    }
    catch(err){
      console.log("Error Uploading File", err);
    }
  }

  return (
    <>
    <div className='flex justify-center py-24'>
    <form encType='multipart/form-data' onSubmit={handleFileUpload}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">ADD Image</legend>
        <div className="join">
          <input type="file" className="file-input" onChange={(e) => setImage(e.target.files[0])} />
          <button className="btn join-item">save</button>
        </div>
      </fieldset>
      </form>
      </div>
    </>
  )
}

export default Uploader
