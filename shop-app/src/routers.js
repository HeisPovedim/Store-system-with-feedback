//Импорт реакт элементов
import React from "react";
import {Switch, Route} from "react-router-dom";

//Импорт страниц
import Login from "./components/page/login/login";
import Home from "./components/page/shop/home/home"
import Beer from "./components/page/shop/beer/beerShop";
import Product from "./components/page/shop/product/productShop";
import PersonalAccountShop from "./components/page/personal account (shop)/personal account/personal_account";
import PersonalAccountUser from "./components/page/personal account (user)/personal account/personal_account"
//Импорт страниц - Функции магазина
import ConfirmationSeller from "./components/page/personal account (shop)/function/сonfirmation or rejection/confirmation_or_rejection";
import ReturnSeller from "./components/page/personal account (shop)/function/return of goods/return_of_goods";
import MarriageSeller from "./components/page/personal account (shop)/function/marriage registration/marriage_registration";
import ProductCreation from "./components/page/personal account (shop)/function/product creation/product_creation";
//Импорт страниц - Функции пользователя
import RefusalToPurchaseUser from "./components/page/personal account (user)/function/refusal to purchase/refusal_to_purchase";
import ReturnOfGoodsUser from "./components/page/personal account (user)/function/return of goods/return_of_goods"
import MarriageRegistration from "./components/page/personal account (user)/function/marriage registration/marriage_registration"
import LeaveFeedback from "./components/page/personal account (user)/function/leave feedback/leave_feedback"

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
      <Route path="/Home" component={Home} exact />
      <Route path="/Beer" component={Beer} exact />
      <Route path="/Product" component={Product} exact />
      <Route path="/PersonalAccountShop" component={PersonalAccountShop} exact />
      <Route path="/PersonalAccountUser" component={PersonalAccountUser} exact />
      <Route path="/ConfirmationSeller" component={ConfirmationSeller} exact />
      <Route path="/ReturnSeller" component={ReturnSeller} exact />
      <Route path="/MarriageSeller" component={MarriageSeller} exact />
      <Route path="/ProductCreation" component={ProductCreation} exact />
      <Route path="/RefusalToPurchaseUser" component={RefusalToPurchaseUser} exact />
      <Route path="/ReturnOfGoodsUser" component={ReturnOfGoodsUser} exact />
      <Route path="/MarriageRegistration" component={MarriageRegistration} exact />
      <Route path="/LeaveFeedback" component={LeaveFeedback} exact />
    </Switch>
  );
};

export default Routers;