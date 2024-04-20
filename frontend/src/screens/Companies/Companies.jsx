import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import "../Companies/Companies.css";

const Companies = () => {
  const [company, setCompany] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/util/companyname.json")
      .then((response) => {
        const jsonData = response.data;
        setCompany(jsonData); // Ensure that jsonData is an array
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }, []); // Empty dependency array to fetch data only once

  const handleResponse = async (companyName) => {
    if (!localStorage.getItem("authToken")) {
      alert("Login first");
      return;
    }

    let userEmail = localStorage.getItem("userEmail");

    try {
      const response = await axios.post(
        "https://stockx-simplified.onrender.com/stocks/trackeddata",
        {
          company_data: companyName,
          email: userEmail,
        }
      );

      console.log("Company response", response.data);

      if (response.data.success === false) {
        alert("You are already tracking this company");
        return;
      }

      if (response.status === 200) {
        alert("Tracker added");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Error occurred. Please check the console");
    }
  };

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
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="allcompaniesgrid">
        {company
          .filter((item) =>
            item["Company Name"].toLowerCase().includes(search.toLowerCase())
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
