//Импорт реакт элементов
import React from "react";
import {Switch, Route} from "react-router-dom";

//Импорт страниц
import Login from "./Components/page/login/login";
import Home from "./Components/page/shop/home/home"
import Beer from "./Components/page/shop/beer/beerShop";
import PersonalAccountShop from "./Components/page/personal account (shop)/personal account/personal_account";
import PersonalAccountUser from "./Components/page/personal account (user)/personal account/personal_account"
//Импорт страниц - Функции магазина
import ConfirmationSeller from "./Components/page/personal account (shop)/function/сonfirmation or rejection/confirmation_or_rejection";
import ReturnSeller from "./Components/page/personal account (shop)/function/return of goods/return_of_goods";
import MarriageSeller from "./Components/page/personal account (shop)/function/marriage registration/marriage_registration";
import ProductCreation from "./Components/page/personal account (shop)/function/product creation/product_creation";
//Импорт страниц - Функции пользователя
import RefusalToPurchaseUser from "./Components/page/personal account (user)/function/refusal to purchase/refusal_to_purchase";
import ReturnOfGoodsUser from "./Components/page/personal account (user)/function/return of goods/return_of_goods"
import MarriageRegistration from "./Components/page/personal account (user)/function/marriage registration/marriage_registration"

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