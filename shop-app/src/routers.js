//Импорт реакт элементов
import React from "react";
import {Switch, Route} from "react-router-dom";

//Импорт страниц
import Login from "./components/page/login/login";
import Home from "./components/page/shop/home/home"
import BeerBuy from "./components/page/shop/beer/beer_buy/beerShop";
import BeerFeedback from "./components/page/shop/beer/beer_feedback/beerFeedback";
import Product from "./components/page/shop/product/productShop";
import PersonalAccountShop from "./components/page/personal_account_shop/personal_account/personal_account";
import PersonalAccountUser from "./components/page/personal_account_user/personal_account/personal_account"
//Импорт страниц - Функции пользователя
import RefusalToPurchaseUser from "./components/page/personal_account_user/function/refusal_to_purchase/refusal_to_purchase";
import ReturnOfGoodsUser from "./components/page/personal_account_user/function/return_of_goods/return_of_goods"
import MarriageRegistration from "./components/page/personal_account_user/function/marriage_registration/marriage_registration"
import LeaveFeedback from "./components/page/personal_account_user/function/leave_feedback/leave_feedback"

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
      <Route path="/Home" component={Home} exact />
      <Route path="/BeerBuy" component={BeerBuy} exact />
      <Route path="/BeerFeedback" component={BeerFeedback} exact />
      <Route path="/Product" component={Product} exact />
      <Route path="/PersonalAccountShop" component={PersonalAccountShop} exact />
      <Route path="/PersonalAccountUser" component={PersonalAccountUser} exact />
      <Route path="/RefusalToPurchaseUser" component={RefusalToPurchaseUser} exact />
      <Route path="/ReturnOfGoodsUser" component={ReturnOfGoodsUser} exact />
      <Route path="/MarriageRegistration" component={MarriageRegistration} exact />
      <Route path="/LeaveFeedback" component={LeaveFeedback} exact />
    </Switch>
  );
};

export default Routers;