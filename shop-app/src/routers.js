import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./Components/Page/Login/login";
import Home from "./Components/Page/Shop/Beer/home"
import Seller from "./Components/Page/Personal account (seller)/Personal account/seller"
import ConfirmationSeller from "./Components/Page/Personal account (seller)/Function/Confirmation or rejection/confirmation_or_rejection"

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
      <Route path="/Home" component={Home} exact />
      <Route path="/Seller" component={Seller} exact />
      <Route path="/ConfirmationSeller" component={ConfirmationSeller} exact />
    </Switch>
  );
};

export default Routers;