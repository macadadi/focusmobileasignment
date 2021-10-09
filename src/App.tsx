import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useAppDispatch } from "./app/hooks";

import "./App.css";
import LandingPage from "./components/products/LandingPage";
import { useEffect } from "react";
import { fetchdata } from "./features/counter/ProductSlice";
import DetailsPage from "./components/Details/DetailsPage";
import NavigationBar from "./components/Navigation/NavigationBar";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchdata());
  }, []);
  return (
    <Router>
      <div className="app">
        <div className="container ">
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/details/:name" component={DetailsPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
