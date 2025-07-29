import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  console.log(users)


  const fetchUser = ()=>{
    axiosPublic.get("/firebase-users").then((result) => setUsers(result.data));
  }
  useEffect(() => {
    fetchUser()
  }, [axiosPublic]);

  //Delete user
  const deleteUser = async (uid) => {
    try {
      const res = await axiosPublic.delete(
        `http://localhost:3000/firebase-users/${uid}`
      );
      if (res.data.success) {
        fetchUser()
        toast.success("User deleted successfully");
      } else {
        toast.error("Delete failed: " + res.data.message);
      }
    } catch (error) {
      toast.error("Error deleting Firebase user: " + error.message);
    }
  };

  return (
    <div className=" flex-1 w-full  text-center">
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
                <th>Created at</th>
                <th>Verify Status</th>
                <th>Remove User</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((item, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{idx + 1}</th>
                  <td>
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={
                        item?.photoURL ||
                        "https://i.ibb.co/S32HNjD/default-avatar.png"
                      }
                      alt="user"
                    />
                  </td>
                  <td>{item?.email}</td>
                  <td>{item?.displayName}</td>
                  <td>{item?.creationTime}</td>
                  <td>
                    {item?.emailVerified ? "✅ Verified" : "❌ Not Verified"}
                  </td>
                  <td>
                    {" "}
                    <button onClick={()=> deleteUser(item?.uid)}  className="btn bg-red-400 text-white">
                      Delete User
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
