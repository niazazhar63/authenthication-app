import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const {loading,googleSignIn} = useContext(AuthContext);
  const navigate = useNavigate("/")
  const handleLoginWithGoogle =async ()=>{
    const result = await googleSignIn();
    toast.success("Logged In with Google")
    navigate("/")
  }


  return (
    <button onClick={handleLoginWithGoogle}  className='bg-[#4285F4] cursor-pointer text-white rounded-md w-full px-4 py-2 flex items-center justify-center gap-2 hover:bg-[#357AE8]bg'>
         <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />
        Google</button>
  )
}

export default GoogleLogin