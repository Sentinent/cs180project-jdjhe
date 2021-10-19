import React from "react";
// import { useState } from "react";
// import ShowConnection from "./components/ShowConnection.jsx"
import ToolBar from "./components/ToolBar";
import SearchHome from "./pages/SearchHome";
// import Insert from "./components/Insert";
import "./App.css";

function App() {
  // const [showInput, setShowInput] = useState(false);
  return (
    <>
      <ToolBar />
      <SearchHome />
      {/* <Insert /> */}
    </>
  );

}

export default App
