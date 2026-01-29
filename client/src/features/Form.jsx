import React from 'react'

const Form = () => {
  return (
    <>
    <div className='flex justify-center py-24'>
    <form>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">ADD User</legend>
        <div className="join">
          <input type="text" className="input join-item" placeholder="User name" />
          <button className="btn join-item">save</button>
        </div>
      </fieldset>
      </form>
      </div>
    </>
  )
}

export default Form
