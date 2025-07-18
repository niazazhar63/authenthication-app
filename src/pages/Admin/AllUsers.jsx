import { useEffect, useState } from "react"
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  
  useEffect(()=>{
    axiosPublic.get("/users")
    .then(result => setUsers(result.data))
  },[axiosPublic])

  console.log(users)

  
  return (
    <div className='border flex-1 w-full  text-center'>
      <p className="text-xl sm:text-3xl md:text-5xl">All Users here</p>

    {/* table section  */}
    <div className="mt-9">
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Profile Picture</th>
        <th>Email</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((item, idx)=>(
        <tr key={idx} className="bg-base-200">
        <th>{idx + 1}</th>
        <td><img className="w-10 h-10" src={item?.photo}></img></td>
        <td>{item?.email}</td>
        <td>{item?.name}</td>
      </tr>
        ))
      }
    </tbody>
  </table>
</div>
    </div>



    </div>
  )
}

export default AllUsers