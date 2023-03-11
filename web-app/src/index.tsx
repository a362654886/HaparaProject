import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import store from "./store";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
