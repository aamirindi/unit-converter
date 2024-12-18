import React from "react";
import "./index.css";
import Converter from "./components/Converter";

function App() {
  return (
    <div
      className="min-h-screen app flex  items-center justify-center"
      style={{
        backgroundImage: "url('/assets/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Converter />
    </div>
  );
}

export default App;
