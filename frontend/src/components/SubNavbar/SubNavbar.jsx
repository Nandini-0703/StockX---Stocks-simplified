import React from "react";

import "../SubNavbar/SubNavbar.css";

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
