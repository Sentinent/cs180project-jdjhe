import React from 'react';
import ToolBar from './components/ToolBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Analytics from './pages/Analytics';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <ToolBar />
            <Home />
          </Route>
          <Route path="/search" exact={true}>
            <ToolBar />
            <Search />
          </Route>
          <Route path="/analytics" exact={true}>
            <ToolBar />
            <Analytics />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
