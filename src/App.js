import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";

function HatsPage()
{
  return (<div><h1>HATS PAGE</h1></div>);
}

function App() {
  return (
    <Switch>
      <div>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop/hats' component={HatsPage}/>
      </div>
    </Switch>
  );
}

export default App;
