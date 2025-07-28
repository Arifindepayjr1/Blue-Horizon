import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userServices from "../services/user.Service.js";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext.jsx";
import { useContext } from "react";

function Login() {
    const {user, setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChange(e){
        const {name ,value} = e.target;
        switch(name){
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default: 
                console.log("Invalid Input");
                break;
        }
    }

    async function handleSubmit(e){
        try{
        e.preventDefault();
        if(!email || !password){
            toast.error(`All Fields are required`);
            return;
        }
        const payLoad = {
            email,
            password
        }
        console.log(payLoad);
        const response = await userServices.login(payLoad);
        if(response){
            console.log("response: ",response);
            setCurrentUser(response);
            console.log("user: " ,user);
            setTimeout(() => {
                navigate("/dashboard");
            }, 800);
            setEmail("");
            setPassword("")
        }else{
            setEmail("");
            setPassword("");
            console.log("Login Failure");
            toast.warn(`Login Failure`);
        }
        }catch(err){
            console.log(`Error: ${err.message}`);
            toast.error(`Error When Trying to Login`);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-lg p-6 sm:p-8 bg-white rounded-2xl shadow-sm">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-black tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue sharing your stories.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 py-3 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-lg"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 py-3 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
          >
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-black font-medium hover:text-gray-800 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


export default Login;
