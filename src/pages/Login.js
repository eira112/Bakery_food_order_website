// src/components/Login.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/loginStyle.css"; // Adjust path based on your folder structure
import { logUserIn } from "../services/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const navigate=useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        logUserIn(email,password).then((response)=>{
            if(response.data.length>0){
              toast.success("login successful!");
              navigate("/manageMenu",{replace:true}); 
            }
        })
    };

  return (
    <div className="background">
      <a href="/" className="go-home">
        <i className="bi bi-arrow-left"></i> Go Home
      </a>

      <div className="center-container">
        <div className="signup-form">
          <h1>Sign In</h1>
          <h2>Have an account?</h2>
          <div className="form-container">
            {/* Example placeholders for notifications */}
            {/* <p style={{ color: "green" }}>Success message here</p>
            <p style={{ color: "red" }}>Error message here</p> */}

            <form>
              <input type="text" name="Email" placeholder="Email" onChange={handleEmailChange}/>
              <input type="password" name="password" placeholder="Password" onChange={handlePasswordChange}/>
              <input type="button" value="Sign In" onClick={handleSubmit}/>
              <p className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
