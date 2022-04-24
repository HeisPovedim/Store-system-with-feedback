//Импорт реакт элементов
import React from "react";
import {Switch, Route} from "react-router-dom";

//Импорт страниц
import Login from "./Components/Page/Login/login";
import Home from "./Components/Page/Shop/Home/home"
import Beer from "./Components/Page/Shop/Beer/beerShop";
import PersonalAccountShop from "./Components/Page/Personal account (shop)/Personal account/personal_account";
import PersonalAccountUser from "./Components/Page/Personal account (user)/Personal account/personal_account"
//Импорт страниц - Функции магазина
import ConfirmationSeller from "./Components/Page/Personal account (shop)/Function/Confirmation or rejection/confirmation_or_rejection";
import ReturnSeller from "./Components/Page/Personal account (shop)/Function/Return of goods/return_of_goods";
import MarriageSeller from "./Components/Page/Personal account (shop)/Function/Marriage registration/marriage_registration";
import ProductCreation from "./Components/Page/Personal account (shop)/Function/Product creation/product_creation";
//Импорт страниц - Функции пользователя
import RefusalToPurchaseUser from "./Components/Page/Personal account (user)/Function/Refusal to purchase/refusal_to_purchase";
import ReturnOfGoodsUser from "./Components/Page/Personal account (user)/Function/Return of goods/return_of_goods"
import MarriageRegistration from "./Components/Page/Personal account (user)/Function/Marriage registration/marriage_registration"

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
      <Route path="/Home" component={Home} exact />
      <Route path="/Beer" component={Beer} exact />
      <Route path="/PersonalAccountShop" component={PersonalAccountShop} exact />
      <Route path="/PersonalAccountUser" component={PersonalAccountUser} exact />
      <Route path="/ConfirmationSeller" component={ConfirmationSeller} exact />
      <Route path="/ReturnSeller" component={ReturnSeller} exact />
      <Route path="/MarriageSeller" component={MarriageSeller} exact />
      <Route path="/ProductCreation" component={ProductCreation} exact />
      <Route path="/RefusalToPurchaseUser" component={RefusalToPurchaseUser} exact />
      <Route path="/ReturnOfGoodsUser" component={ReturnOfGoodsUser} exact />
      <Route path="/MarriageRegistration" component={MarriageRegistration} exact />
    </Switch>
  );
};

export default Routers;