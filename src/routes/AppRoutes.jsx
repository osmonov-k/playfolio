import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import Wordle from "../games/wordle/Wordle";

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="wordle" element={<Wordle />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
