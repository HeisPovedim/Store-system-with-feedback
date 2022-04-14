import React, { useEffect, useState } from "react";
import { UseContext } from "../../../Contract/context";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import "./beerShop.css"
import { Link } from 'react-router-dom'

const Home = () => {
  const history = useHistory();
  const [balance, setBalance] = useState();
  const [role, setRole] = useState();
  const login = localStorage.getItem('login')

  const personalAccountSign = async (e) => {
    try{
      if (role === "2") {
        history.push("/");
      } else if (role === "3") {
        history.push("/PersonalAccountShop");
      }
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }

  useEffect(() => {
    setBalance(localStorage.getItem('balance'))
    setRole(localStorage.getItem('role'))
  })

  return(
    <>
    <div className="container-page-home">
      <header className="container-page-home__header-shop-beer">
        <div className="container-page-home__header-shop-beer_text-header">Ассортимент</div>
        <div className="container-page-home__header-shop-beer_personal-info">
          <div className="container-page-home__header-shop-beer_personal-info_name">{login}, {balance}</div>
          <p>{(role === '3')?'пользователь':'error'}</p>
          <Link className="container-page-home__header-shop-beer_personal-info_link" onClick={personalAccountSign}>Личный кабинет</Link>
        </div>
      </header>
      <div className="container-page-home__menu">
        <div className="menu__logo-beer"></div>
        <div className="menu">
          <button className="menu__buy-button">КУПИТЬ</button>
          <select className="menu__products-select">
          
          </select>
        </div>
      </div>
      <div className="container-page-home__but-info">
        <div>but</div>
      </div>
    </div>
    </>
  );
};

export default Home;