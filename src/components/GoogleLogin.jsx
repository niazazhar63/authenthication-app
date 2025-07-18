import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const axiosPublic = useAxiosPublic();
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate("/");
  const handleLoginWithGoogle = async () => {
    const result = await googleSignIn();
    console.log(result);
    const userData = {
      email: result.user.email,
      name: result.user.displayName,
      photo: result.user.photoURL,
    };
    axiosPublic.post("/users", userData).then((res) => {
      console.log(res)
      if (res.status === 200) {
        toast.success("Logged In with Google");
        navigate("/");
      } else {
        toast.error("Something Went Wrong");
      }
    });
  };

  return (
    <button
      onClick={handleLoginWithGoogle}
      className="bg-[#4285F4] cursor-pointer text-white rounded-md w-full px-4 py-2 flex items-center justify-center gap-2 hover:bg-[#357AE8]bg"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5 bg-white rounded-full p-0.5"
      />
      Google
    </button>
  );
};

export default GoogleLogin;
