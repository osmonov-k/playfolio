import { useState } from "react";
import Wordle from "./games/wordle/Wordle";
import AppRoutes from "./routes/AppRoutes";
import Memory from "./games/memoryGame/Memory";
import ConnectFour from "./games/connectFour/ConnectFour";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
