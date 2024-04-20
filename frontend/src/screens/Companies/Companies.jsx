import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper, Typography } from "@material-ui/core";
import Navbar from "../../components/Navbar/Navbar";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import "../Companies/Companies.css";

const Companies = () => {
  const [company, setCompany] = useState([]);
  const [search, setSearch] = useState("");

  const Navigate = useNavigate();

  const handleResponse = async (companyName) => {
    if (!localStorage.getItem("authToken")) {
      alert("login first");
      exit(0);
    }

    let userEmail = localStorage.getItem("userEmail");

    const response = await axios
      .post("https://stockx-simplified.onrender.com/stocks/trackeddata", {
        company_data: companyName,
        email: userEmail,
      })
      .then((response) => {
        console.log("comapany response", response);
        if (response.data.success == false) {
          alert("you are already tracking this company");
          return;
        }
        if (response.status === 200) {
          alert("tracker added ");
        }
      })
      .catch((error) => {
        alert("error occurred . please check the console");
        console.log(error);
      });
  };
  axios
    .get("/util/companyname.json")
    .then((response) => {
      const jsonData = response.data;
      setCompany(jsonData);
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
  return (
    <div className="companiescontainer">
      <Navbar />
      <div className="subnavbar">
        <SubNavbar />
      </div>
      <form className="d-flex newssearch searchnews">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="allcompaniesgrid">
        {company
          .filter((item) =>
            item["Company Name"]
              .toLowerCase()
              .includes(search.toLocaleLowerCase())
          )
          .map((company, index) => (
            <div className="onepaper" key={index}>
              <p className="gridcompany" data-company={company["Company Name"]}>
                <Link to={`/stock/info/${company["Company Name"]}`}>
                  {company["Company Name"]}
                </Link>
              </p>
              <button
                className="gridbutton"
                onClick={() => handleResponse(company["Company Name"])}
              >
                Track
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Companies;
