import React, { useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setAllUser] = useState([]);
  const [pageDetail, setPageDetail] = useState();
  const [userDetail, setUserDetail] = useState({
    id: "",
    email: "",
    password: "",
  });
  
  const handleUserChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = { ...userDetail };
    newFormData[fieldName] = fieldValue;
    setUserDetail(newFormData);
  };

  const submitHandler = async (event) => {
    console.log("helooo");
    event.preventDefault();
    const res = await axios.post("http://localhost:3001/users", userDetail);
    navigate("/AddProduct");
    setPageDetail(res.data);
    const newUser = {
    id : userDetail.id,
    email:userDetail.email,
    password:userDetail.password
    }
   const newUsers=[...user,newUser]
   setAllUser(newUsers)
  };

  useEffect(() => {
    submitHandler();
  }, []);

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
                value={user.email}
                onChange={handleUserChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                id="password"
                value={user.password}
                onChange={handleUserChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">       
                <button type="submit" className="btn btn-primary">         
                  Submit
                </button>
              
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
