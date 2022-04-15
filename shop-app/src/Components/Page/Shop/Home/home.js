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
      <body className="container-home">
        <header className="header-home">
          <div className="header-home_text-header">Меню</div>
          <div className="header-home_personal-info">
            <div className="header-home_personal-info_name">{login}, {balance}</div>
            <p>{(role === '3')?'пользователь':'error'}</p>
            <Link className="header-home_personal-info_link" onClick={personalAccountSign}>Личный кабинет</Link>
          </div>
        </header>
        <div className="menu-home">
          <div className="menu-home__border-one">
            <Link to="/Beer"><button>Beer</button></Link>
          </div>
          <div className="menu-home__border-two">
            <button>Product</button>
          </div>
        </div>
        <footer className="footer-home">
            <div>but</div>
        </footer>
      </body>
    </>
  )
}
export default Home;