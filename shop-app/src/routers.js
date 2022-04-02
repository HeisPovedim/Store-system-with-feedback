import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./Components/Page/Login/login";
import Home from "./Components/Page/Shop/Beer/home"
import Seller from "./Components/Page/Personal account (seller)/seller"

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
      <Route path="/Home" component={Home} exact />
      <Route path="/Seller" component={Seller} exact />
    </Switch>
  );
};

export default Routers;