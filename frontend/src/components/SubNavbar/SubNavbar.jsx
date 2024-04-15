import React from "react";
import Link from "@material-ui/core/Link";
import "./subNavbar.css";

const SubNavbar = () => {
  return (
    <div className="subNavbar">
      <Link href="/company" className="subnavheading">
        All Companies
      </Link>

      {localStorage.getItem("authToken") ? (
        <>
          <Link href="/tracked" className="subnavheading">
            Tracked Companies
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default SubNavbar;
