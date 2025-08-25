// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logUserIn } from "../services/auth";
import signupPhoto from "../Assets/signupPhoto.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error, setError]=useState({
    email:'',
    password:''
  })

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = () => {
    let hasError=false;
    let validationError={
      email:'',
      password:''
    }
    if(email.trim()===''){
      validationError.email="Please enter your email";
      hasError=true;
    }
    if(password.trim()===''){
      validationError.password="Please enter your password";
      hasError=true;
    }
    setError(validationError);
    if(!hasError){
      if(email==='admin@gmail.com' && password==='admin'){
        toast.success("Welcome back admin!");
        localStorage.setItem("authToken",'admin12')
        navigate("/admin/manageMenu", { replace: true });

      }
      else{
        logUserIn(email, password).then((response) => {
        if (response.data.length > 0) {
          toast.success("Login successful!");
          localStorage.setItem("authToken",response.data[0].id)
          navigate("/home", { replace: true });
        }else{
          toast.error("Invalid credentials. Try again!")
        }
        });
      }
    }
    
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${signupPhoto})` }}>
      {/* Home button */}
      <a
        href="/home"
        className="absolute top-5 left-5 flex items-center text-white font-medium hover:underline transition"
      >
        <i className="bi bi-arrow-left mr-2"></i> Go Home
      </a>

      {/* Form Container */}
      <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Sign In</h1>
        <h2 className="text-sm md:text-lg text-white/80 mb-6 text-center">Have an account?</h2>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="px-4 py-3 rounded-2xl bg-white/20 placeholder-white focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full"
          />
          {error.email && <p className="error">{error.email}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="px-4 py-3 rounded-2xl bg-white/20 placeholder-white focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full"
          />
          {error.password && <p className="error">{error.password}</p>}
          <input
            type="button"
            value="Sign In"
            onClick={handleSubmit}
            className="mt-2 py-3 bg-white text-gray-900 font-medium rounded-2xl hover:bg-white/90 transition w-full cursor-pointer"
          />
        </form>

        <p className="text-right mt-2 text-sm">
          <a
            href="/forgot-password"
            className="text-indigo-300 hover:underline"
          >
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
