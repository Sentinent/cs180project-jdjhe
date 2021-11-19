import React from 'react';
import ToolBar from './components/ToolBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Analytics from './pages/Analytics';
import About from './pages/About';
import Custom from './pages/Custom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Violations from './pages/Violations';

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
          <Route path="/about" exact={true}>
            <ToolBar />
            <About />
          </Route>
          <Route path="/custom" exact={true}>
            <ToolBar />
            <Custom />
          </Route>
          <Route path="/violations" exact={true}>
            <ToolBar />
            <Violations />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
