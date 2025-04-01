import { useState } from "react";
import Wordle from "./games/wordle/Wordle";
import AppRoutes from "./routes/AppRoutes";
import Memory from "./games/memoryGame/Memory";
import ConnectFour from "./games/connectFour/ConnectFour";

function App() {
  return (
    <>
      <AppRoutes />
      <ConnectFour />
      {/* <Wordle />
      <Memory /> */}
    </>
  );
}

export default App;
