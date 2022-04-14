import React, { useEffect, useState } from "react";
import { UseContext } from "../../../Contract/context";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import "./beerShop.css"
import { Link } from 'react-router-dom'

const Beer = () => {


  return(
    <>
    <div className="container-page-beer">
      <header className="container-page-beer__header-shop-beer">
        <div className="container-page-beer__header-shop-beer_text-header">Ассортимент</div>
        <div className="container-page-beer__header-shop-beer_personal-info">
        </div>
      </header>
      <div className="container-page-beer__menu">
        <div className="menu__logo-beer"></div>
        <div className="menu">
          <button className="menu__buy-button">КУПИТЬ</button>
          <select className="menu__products-select">
          
          </select>
        </div>
      </div>
      <div className="container-page-beer__but-info">
        <div>but</div>
      </div>
    </div>
    </>
  );
};

export default Beer;