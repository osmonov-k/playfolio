import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import Wordle from "../games/wordle/Wordle";
import ConnectFour from "../games/connectFour/ConnectFour";
import Memory from "../games/memoryGame/Memory";
import Navbar from "../components/navbar/Navbar"; // Import Navbar

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wordle" element={<Wordle />} />
      <Route path="/connectfour" element={<ConnectFour />} />
      <Route path="/memory" element={<Memory />} />
    </Routes>
  );
};

export default AppRoutes;
