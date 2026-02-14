import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { useEffect } from 'react';

const Uploader = () => {

  const [image, setImage] = useState(null);
  const [myFile, setMyFile] = useState([]);
  const fileInputRef = useRef(null);


  const handleFileUpload = async(e) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append("myImage", image);
      const response = await axios.post("http://localhost:3000/api/fileupload", formData);
      console.log(response);
      toast.success(response.data.message);

      fileInputRef.current.value = "";
    }
    catch(err){
      console.log("Error Uploading File", err);
    }
  }

  const fetchFiles = async() => {
    try{
      const response = await axios.get("http://localhost:3000/api/getmyfiles");
      console.log(response.data.files);
      setMyFile(response.data.files);
    }
    catch(err){
      console.log("Error Fetching Files", err);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, [])

  return (
    <>
    <div className='flex justify-center py-24'>
    <form encType='multipart/form-data' onSubmit={handleFileUpload}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">ADD Image</legend>
        <div className="join">
          <input type="file" className="file-input" onChange={(e) => setImage(e.target.files[0])} ref={fileInputRef} />
          <button className="btn join-item">save</button>
        </div>
      </fieldset>
      </form>
      </div>

      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
        </tr>
        </thead>
    
        <tbody>
        {myFile.map((m) => (
        <tr key={m._id}>
          <td>{m._id}</td>
          <td>{m.image}</td>
          <td>
            <img src={`http://localhost:3000/uploads/${m.image}`} alt="" />
          </td>
        </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default Uploader
