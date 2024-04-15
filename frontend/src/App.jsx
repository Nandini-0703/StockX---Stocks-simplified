import React from "react";
import { Route, Routes } from "react-router-dom";
import StocksNews from "./screens/StockNews/StocksNews";
import Companies from "./screens/Companies/Companies";

import Signup from "./screens/SignUp/Signup";
import Login from "./screens/Login/Login";
import StockInfo from "./screens/Stockinfo/StockInfo";
import FinancialReport from "./screens/FinancialReport/FinancialReport";
import Hero from "./screens/Hero/Hero";
import Track from "./screens/Track/Track";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Hero />} />
      <Route exact path="/news" element={<StocksNews />} />
      <Route exact path="/company" element={<Companies />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/stock/info/:company" element={<StockInfo />} />
      <Route exact path="/report" element={<FinancialReport />} />
      <Route exact path="/tracked" element={<Track />} />
    </Routes>
  );
}

export default App;
