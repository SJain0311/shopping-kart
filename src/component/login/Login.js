import React, { useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [allEntry,setAllEntry]=useState([]);

const submitHandler=e=>
{
  e.preventDefault();
 const newEntry ={id:new Date().getTime().toString() ,email:email,password:password};
 setAllEntry([...allEntry,newEntry]);
 console.log(newEntry);
 setEmail("");
 setPassword("");
}

  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" action="" onSubmit={submitHandler}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control mt-1"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
             <Link to="/Item"> <button type="submit" className="btn btn-primary">
                Submit
              </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <footer className="footer">
        <Link to="/AdminLogin" className="adminBtn">
          Admin Login
        </Link>
      </footer>
    </div>
  );
};

export default Login;
