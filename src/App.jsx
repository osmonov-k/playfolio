import { useState } from "react";
import Wordle from "./games/wordle/Wordle";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />

      <Wordle />
    </>
  );
}

export default App;
