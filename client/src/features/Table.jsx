import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Table = () => {

  const [usersData, setUsersData] = useState([]);

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
  }, []);


  return (
    <>
      <div className="overflow-x-auto w-[600px] justify-self-center py-24">
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
            {usersData.map((u) => (
            <tr>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>
                <button className="btn btn-soft btn-info">Edit</button>
                <button className="btn btn-soft btn-error">Delete</button>
              </td>
            </tr>
            ))}
          
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
