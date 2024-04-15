import React from "react";

import { useTheme } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import Link from "@material-ui/core/Link";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

export default function DenseAppBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav id="navbar">
        <Link href="/" className="stockstitle">
          StockX
        </Link>
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link href="/news" className={menuOpen ? "open" : "menuelements"}>
          News
        </Link>
        <Link href="/company" className={menuOpen ? "open" : "menuelements"}>
          Companies
        </Link>{" "}
        <Link href="/report" className={menuOpen ? "open" : "menuelements"}>
          Report
        </Link>
        {!localStorage.getItem("authToken") ? (
          <div className={menuOpen ? "open" : "navbtn"}>
            {" "}
            <Button variant="h6">
              <Link href="/login" style={{ color: "white" }} underline="none">
                Login
              </Link>
            </Button>
            <Button variant="h6">
              <Link href="/signup" style={{ color: "white" }} underline="none">
                Signup
              </Link>
            </Button>
          </div>
        ) : (
          <Button
            style={{ marginLeft: "auto", marginRight: "10px", color: "white" }}
            variant="h6"
            onClick={handleLogout}
            className={menuOpen ? "open" : "navbtn"}
          >
            Logout
          </Button>
        )}
      </nav>
    </div>
  );
}
