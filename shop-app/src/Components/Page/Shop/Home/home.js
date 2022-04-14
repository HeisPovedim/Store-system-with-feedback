import React, { useEffect, useState } from "react";
import { UseContext } from "../../../Contract/context";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import { Link } from 'react-router-dom'
import "./home.css";

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
      <header className="container-page-home__header-shop-home">
        <div className="container-page-home__header-shop-home_text-header">Меню</div>
        <div className="container-page-home__header-shop-home_personal-info">
          <div className="container-page-home__header-shop-home_personal-info_name">{login}, {balance}</div>
          <p>{(role === '3')?'пользователь':'error'}</p>
          <Link className="container-page-home__header-shop-home_personal-info_link" onClick={personalAccountSign}>Личный кабинет</Link>
        </div>
      </header>
      <div className="menu-home">
        <div className="menu-home__border-one">

        </div>
        <div className="menu-home_border-two">
      
        </div>
      </div>
    </>
  )
}
export default Home;