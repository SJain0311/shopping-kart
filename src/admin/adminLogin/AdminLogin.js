import React, { useState } from "react";
import "../../component/login/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allEntry, setAllEntry] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newEntry = {
      id: new Date().getTime().toString(),
      email: email,
      password: password,
    };
    if ((email === "admin@gmail.com", password === "Admin123")) {
      console.log("Admin");
      navigate("/AddProduct");
    } else {
      alert("Plz Enter Correct");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" action="" onSubmit={submitHandler}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Admin Login</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
        <Link to="/" className="adminBtn">
          Back to Login
        </Link>
      </footer>
    </div>
  );
};

export default AdminLogin;
