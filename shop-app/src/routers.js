//Импорт реакт элементов
import React from "react";
import {Switch, Route} from "react-router-dom";

//Импорт страниц
import Login from "./components/page/login/login";
import Home from "./components/page/shop/home/home"
import BeerBuy from "./components/page/shop/beer/beer_buy/beerShop";
import BeerFeedback from "./components/page/shop/beer/beer_feedback/beerFeedback";
import ProductBuy from "./components/page/shop/product/product_buy/productShop";
import ProductFeedback from "./components/page/shop/product/product_feedback/productFeedback";
import PersonalAccountShop from "./components/page/personal_account_shop/personal_account";
import PersonalAccountUser from "./components/page/personal_account_user/personal_account";

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
      <Route path="/Home" component={Home} exact />
      <Route path="/BeerBuy" component={BeerBuy} exact />
      <Route path="/BeerFeedback" component={BeerFeedback} exact />
      <Route path="/ProductBuy" component={ProductBuy} exact />
      <Route path="/ProductFeedback" component={ProductFeedback} exact />
      <Route path="/PersonalAccountShop" component={PersonalAccountShop} exact />
      <Route path="/PersonalAccountUser" component={PersonalAccountUser} exact />
    </Switch>
  );
};

export default Routers;