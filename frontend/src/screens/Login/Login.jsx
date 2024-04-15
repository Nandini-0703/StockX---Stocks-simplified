import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../../components/Navbar/Navbar";
import "../Login/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: credentials.password,
      email: credentials.email,
    };

    axios
      .post("https://stockx-simplified.onrender.com/api/loginuser", data)
      .then((res) => {
        localStorage.setItem("authToken", res.data.authToken);
        localStorage.setItem("userEmail", credentials.email);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      })
      .catch((error) => {
        alert("enter valid credentials");
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="logincontainer">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I'm a New User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
