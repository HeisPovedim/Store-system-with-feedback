import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./Components/Page/Login/login";
import Beer from "./Components/Page/Shop/Beer/home";
import PersonalAccountShop from "./Components/Page/Personal account (shop)/Personal account/personal_account";
import ConfirmationSeller from "./Components/Page/Personal account (shop)/Function/Confirmation or rejection/confirmation_or_rejection";
import Return from "./Components/Page/Personal account (shop)/Function/Return of goods/return_of_goods";
import Marriage from "./Components/Page/Personal account (shop)/Function/Marriage registration/marriage_registration";
import ProductCreation from "./Components/Page/Personal account (shop)/Function/Product creation/product_creation"

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
      <Route path="/Beer" component={Beer} exact />
      <Route path="/PersonalAccountShop" component={PersonalAccountShop} exact />
      <Route path="/ConfirmationSeller" component={ConfirmationSeller} exact />
      <Route path="/Return" component={Return} exact />
      <Route path="/Marriage" component={Marriage} exact />
      <Route path="/ProductCreation" component={ProductCreation} exact />
    </Switch>
  );
};

export default Routers;