import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const {user, logOut} = useContext(AuthContext)
  
  const handleLogout = async()=>{
    try {
      const result = await logOut();
      console.log("logged out", result)
      toast.success("Logged Out Successfully")
    } catch (error) {
      console.log(error.message)
    }
  }
  const links = (
    <>
      <NavLink className="mr-2" to="/">Home</NavLink>
      <NavLink className="mr-2" to="/allVolunteerPost">Link 1</NavLink>
      <NavLink className="mr-2" to="/allVolunteerPost">Link 2</NavLink>
      <NavLink className="mr-2" to="/allVolunteerPost">Link 3</NavLink>
      
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-base sm:text-xl">Authentication APP</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-5">
        {user && user?.email ? (
          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL? user.photoURL : "https://static.vecteezy.com/system/resources/previews/032/176/191/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg" }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-[-2] w-52 p-2 shadow"
            >
              <p className="text-center">{user?.displayName? user.displayName : "Anonymous User"}</p>
              <button onClick={handleLogout} className="text-sm cursor-pointer bg-blue-500 text-white px-10 py-2.5">
                <li >Log out</li>
              </button>
              {
                user.email === import.meta.env.VITE_ADMIN_EMAIL && <button  className="text-sm cursor- mt-2 bg-blue-500 text-white px-10 py-2.5">
                <NavLink to="/dashboard/users">Dashboard</NavLink>
              </button>
              }
            </ul>
          </div>
        ) : (
          <Link to="/login" className=" text-sm cursor-pointer bg-blue-500 text-white px-10 py-2.5">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;