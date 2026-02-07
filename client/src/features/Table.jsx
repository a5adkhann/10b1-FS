import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
const Table = () => {

  const [usersData, setUsersData] = useState([]);
  const [editingID, setEditingID] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchUsersData = async() => {
    try{
      const response = await axios.get("http://localhost:3000/api/users");
      console.log(response.data.users);
      setUsersData(response.data.users);
    }
    catch(err){
      console.log("Error Fetching Users", err);
    }
  }

  useEffect(() => {
    fetchUsersData();
  }, [usersData]);


  const handleEdit = (u) => {
    setEditingID(u._id);
    setEditName(u.name);
    console.log(u);
  }

  const saveEdit = async() => {
    try{
      const response = await axios.put(`http://localhost:3000/api/updateuser/${editingID}`, {
        Name: editName
      });
      console.log(response);
      setEditingID(null);
      setEditName("");
      toast.success(response.data.message);
    }
    catch(err){
      console.log("Error Updating", err);
    }
  }

  const handleDelete = async(id) => {
    try{
      const response = await axios.delete(`http://localhost:3000/api/deleteuser/${id}`);
      console.log(response);
      setUsersData([]);
      toast.success(response.data.message);
    }
    catch(err){
      console.log("Error deleting data", err);
    }
  }

  return (
    <>
      <div className="overflow-x-auto w-[600px] justify-self-center py-24">

        {usersData.length > 0 ? 
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {usersData.map((u, i) => (
            <tr key={u._id}>
              <td>{i+1}</td>
              <td>{
              editingID == u._id?
              <input className='border border-gray-300 p-2' type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
              :
              u.name
              }</td>
              <td>
                {
                editingID == u._id ?
                <>
                <button className="btn btn-soft btn-success" onClick={saveEdit}>Save</button>
                <button className="btn btn-soft btn-warning" onClick={() => setEditingID(null)}>Cancel</button>
                </>
                :
                <>
                <button onClick={() => handleEdit(u)} className="btn btn-soft btn-info">Edit</button>
                <button className="btn btn-soft btn-error" onClick={() => handleDelete(u._id)}>Delete</button>
                </>
}
              </td>
            </tr>
            ))}
          
          </tbody>
        </table>
        :
        <p className='text-center text-red-600'>No users found...</p>
          }

      </div>
    </>
  )
}

export default Table
