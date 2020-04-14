import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Lists from "./list/Lists";
import Movies from "./movies/Movies";

import "./App.scss";

function App() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>Movie List Coding Challenge</h1>
        </div>
      </header>
      <Switch>
        <Route exact path="/list" component={Lists}></Route>
        <Route path="/list/:id" component={Movies}></Route>
        <Redirect to="/list"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
