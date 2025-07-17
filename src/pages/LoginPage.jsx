import { useContext, useState } from "react";
import GoogleLogin from "../components/GoogleLogin";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const {loginUser, createUser,handleUpdateUser} = useContext(AuthContext)
  const [currentState, setCurrentState] = useState("login");
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  // submit form here to login
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(currentState ==="login"){
      try{
        const result = await loginUser(email, password);
        console.log("logged in from login page", result.user);
        toast.success("Successfully Logged In")
        navigate("/")
      }catch(error){
        console.error("Login Failed", error.message)
        toast.error(error.message)
      }
    }else{
        try{
          const result = await createUser(email,password);
          handleUpdateUser({
            displayName: name
          })
          console.log("Acc created", result.user);
          toast.success("Successfully Created Account")
          navigate('/')
        }catch(error){
          console.error("Login Failed", error.message)
          toast.error(error.message)
        }
      }
  };

  return (
    <div className=" min-h-[95vh] flex">
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
        >
          {currentState === "login" ? "Login" : "Sign Up"}
        </button>
        <GoogleLogin />
      </form>
    </div>
  );
};

export default Login;
