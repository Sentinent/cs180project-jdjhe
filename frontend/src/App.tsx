import React from "react";
import { useState } from "react";
import { ShowConnection } from "./components/ShowConnection.jsx";
import Header from "./components/Header"
import FieldsMenu from "./components/FieldsMenu";
import "./App.css";

function App() {
  const [showInput, setShowInput] = useState(false)
  return (
    <>
      <Header 
        onClick={() => setShowInput(!showInput)} 
        show={showInput}
      />
      <div>
        {showInput && <FieldsMenu /> }
        <ShowConnection />
      </div>
    </>
  );
  
}

export default App;
