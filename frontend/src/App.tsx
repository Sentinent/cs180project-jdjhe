import React from "react";
// import { useState } from "react";
// import ShowConnection from "./components/ShowConnection.jsx"
import ToolBar from "./components/ToolBar";
// import SearchHome from "./pages/SearchHome";
import MainView from "./components/MainView";
import Analytics from "./pages/Analytics";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";

function App() {
  // const [showInput, setShowInput] = useState(false);
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <ToolBar />
            <MainView />
          </Route>
          <Route path='/analytics' exact={true}>
            <ToolBar />
            <Analytics />
          </Route>
        </Switch>
      </Router>

      {/* <Analytics /> */}
    </>


    /*
      { <Header
        onClick={() => setShowInput(!showInput)}
        show={showInput}
      /> }
    
    {
      <div>
        {showInput && <FieldsMenu />}
        {showInput && <Search />}
        <ShowConnection />
      </div>
    */
  );
}

export default App;
