import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
