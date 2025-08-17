import { useState } from "react";
import "../css/signUpStyle.css"; 
import { addUser } from "../services/user";

const SignUp = () => {
    const [user,setUser] = useState({})
    let handleChange = (e)=>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }

    let handleSubmit = ()=>{
        addUser(user).then((response)=>{
            if(response.data){
                console.log("sign up successful"); //add a notification for user
            }
        })
    }

  return (
    <div className="background">
      {/* Home button with an arrow */}
      <a href="/" className="go-home">
        <i className="bi bi-arrow-left"></i> Go Home
      </a>

      <div className="center-container">
        <div className="signup-form">
          <h1>Sign Up</h1>
          <h2>Don't have an account?</h2>

          <div className="form-container">
            {/* <p style={{ color: "red" }}>Error message here</p> */}
            <form>
              <input type="text" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
              <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" onChange={handleChange} required/>
              <input type="button" value="Sign Up"  onClick={handleSubmit}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
