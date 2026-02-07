import React from 'react'

const Uploader = () => {

  return (
    <>
    <div className='flex justify-center py-24'>
    <form>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">ADD Image</legend>
        <div className="join">
          <input type="file" className="file-input" />
          <button className="btn join-item">save</button>
        </div>
      </fieldset>
      </form>
      </div>
    </>
  )
}

export default Uploader
