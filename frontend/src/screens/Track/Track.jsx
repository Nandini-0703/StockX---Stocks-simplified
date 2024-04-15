import React, { useState, useEffect } from "react";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import Navbar from "../../components/Navbar/Navbar";
import { Button } from "bootstrap";
import "../Track/Track.css";

const Track = () => {
  const [trackedCompany, setTrackedCompany] = useState([]);

  const fetchMyData = async () => {
    console.log(localStorage.getItem("userEmail"));

    await fetch(
      "https://stockx-simplified.onrender.com/stocks/mytrackedcompany",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      }
    ).then(async (res) => {
      let response = await res.json();

      setTrackedCompany(response);
    });
  };

  const handleRemove = async (companyName) => {
    try {
      const response = await fetch(
        "https://stockx-simplified.onrender.com/stocks/removeTrackedCompany",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"),
            companyName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to remove tracked company: ${response.statusText}`
        );
      }

      fetchMyData();
    } catch (error) {
      console.error("Error removing tracked company:", error.message);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <SubNavbar />

        <div>
          <div className="trackcontainer">
            {trackedCompany != {} ? (
              Array(trackedCompany).map((data) => {
                return data.TrackedData ? (
                  data.TrackedData.company_data.length > 0 ? (
                    data.TrackedData.company_data
                      .slice(0)
                      .reverse()
                      .map((item) => (
                        <div className="trackitem">
                          {item}
                          <button
                            className="removetracker"
                            onClick={() => handleRemove(item)}
                          >
                            Remove
                          </button>
                        </div>
                      ))
                  ) : (
                    <p className="notrack">
                      {" "}
                      you are not tracking any company{" "}
                    </p>
                  )
                ) : (
                  <p className="notrack">
                    {" "}
                    You are not tracking any company...
                  </p>
                );
              })
            ) : (
              <p className="notrack"> you are not tracking any company... </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
