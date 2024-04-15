import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import "../SignUp/Signup.css";

const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    user: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: credentials.user,
      password: credentials.password,
      email: credentials.email,
      location: credentials.geolocation,
    };
    console.log(credentials);
    axios
      .post("https://stockx-simplified.onrender.com/api/createuser", data)
      .then(() => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => {
        alert("enter valid credentials");
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container signupcontainer">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="user"
              value={credentials.user}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
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
            <div id="passwordhelp" className="form-text">
              Password should be greater than five characters.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLocation"
              name="geolocation"
              value={credentials.geolocation}
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
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
