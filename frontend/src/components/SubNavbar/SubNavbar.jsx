import React from "react";
// import Link from "@material-ui/core/Link";
import "./subNavbar.css";

const SubNavbar = () => {
  return (
    <div className="subNavbar">
      <a href="/company" className="subnavheading">
        All Companies
      </a>

      {localStorage.getItem("authToken") ? (
        <>
          <a href="/tracked" className="subnavheading">
            Tracked Companies
          </a>
        </>
      ) : null}
    </div>
  );
};

export default SubNavbar;
