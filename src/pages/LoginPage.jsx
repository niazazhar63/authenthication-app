import { useContext, useState } from "react";
import GoogleLogin from "../components/GoogleLogin";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../assets/asstes";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { loginUser, createUser, handleUpdateUser } = useContext(AuthContext);
  const [currentState, setCurrentState] = useState("login");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  // submit form here to login
  const handleSubmit = async (e) => {
    const userData = {
      email: email,
      name: name,
      photo:
        "https://static.vecteezy.com/system/resources/previews/032/176/191/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg",
    };
    setLoading(true)
    e.preventDefault();
    if (currentState === "login") {
      try {
        const result = await loginUser(email, password);
        console.log("logged in from login page", result.user);
        toast.success("Successfully Logged In");
        navigate("/");
      } catch (error) {
        console.error("Login Failed", error.message);
        toast.error(error.message);
      }
      finally{
        setLoading(false)
      }
    } else {
      try {
  const result = await createUser(email, password);

  // Await the user update (if it returns a promise)
  await handleUpdateUser({
    displayName: name,
  });

  const res = await axiosPublic.post("/users", userData);
  if(res.status === 200){
    navigate("/")
    toast.success("Account Created! A verification email sent to your email!")
  }
  
} catch (error) {
  console.error("Sign Up Failed", error);
  toast.error(error.message || "Sign Up Failed");
} finally {
  setLoading(false);
}

    }
  };

  return (
    <div className=" min-h-[95vh] flex relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center border p-8 w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === "login" ? (
          ""
        ) : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-3 py-1 border outline-none border-gray-500"
            placeholder="Name"
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-3 py-1 border outline-none border-gray-500"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-3 border py-1 outline-none border-gray-500"
          placeholder="Password"
          required
          autoComplete="current-password"
        />

        <div className="w-full flex justify-end  text-sm ">
          {currentState === "login" ? (
            <p
              onClick={() => setCurrentState("Sign up")}
              className="cursor-pointer underline px-2"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("login")}
              className="cursor-pointer underline px-2"
            >
              Login here
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-black cursor-pointer text-white w-full font-white px-8 py-2 mt-4"
          disabled={loading}
        >
          {currentState === "login"
            ? `Login`
            : `Sign Up`}

              {loading && <span className="loading loading-spinner loading-sm"></span>}
        </button>
        <GoogleLogin />
      </form>

      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
        alt=""
      />
    </div>
  );
};

export default Login;
