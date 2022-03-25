import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./Components/Page/Login/login";

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
    </Switch>
  );
};

export default Routers;