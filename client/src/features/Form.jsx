import React, { useState } from 'react'
import axios from 'axios'

const Form = () => {

  const [nameField, setNameField] = useState("");

  const handleSubmission = async(e) => {
    try{
      e.preventDefault();

      const response = await axios.post("http://localhost:3000/api/create", {
        nameField
      });
      console.log(response);
    }
    catch(err){
      console.log("Error Submitting Form", err);
    }
  }

  return (
    <>
    <div className='flex justify-center py-24'>
    <form onSubmit={handleSubmission}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">ADD User</legend>
        <div className="join">
          <input type="text" className="input join-item" placeholder="User name" value={nameField} onChange={(e) => setNameField(e.target.value)} />
          <button className="btn join-item">save</button>
        </div>
      </fieldset>
      </form>
      </div>
    </>
  )
}

export default Form
