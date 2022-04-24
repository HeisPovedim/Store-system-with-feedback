import React, { useEffect, useState } from "react";
import { UseContext } from "../../../Contract/context";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import "./home.css";

const Home = () => {
  const history = useHistory();
  const { Contract } = UseContext();
  const [balance, setBalance] = useState();
  const [role, setRole] = useState();
  const login = localStorage.getItem("login");
  const address = localStorage.getItem("address")

  useEffect(() => {
    setBalance(localStorage.getItem('balance'))
    setRole(localStorage.getItem('role'))
  },[])

  const PersonalAccountSign = async (e) => {
    try {
      if (role === "2") {
        history.push("/PersonalAccountUser");
      } else if (role === "3") {
        history.push("/PersonalAccountShop");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const LoggedOut = async (e) => {
    try {
      const roleUser = await Contract.methods.get_role_user(login).call();
      console.log("roleUser:", roleUser);
      const roleShop = await Contract.methods.get_role_shop(login).call();
      console.log("roleShop",roleShop);
      if(roleUser === "2") {
        alert("Вы вышли с аккаунта!");
        await Contract.methods.login_out_user(login).send({from:address});
      } else if (roleShop === "3") {
        alert("Вы вышли с аккаунта!");
        await Contract.methods.login_out_shop(login).send({from:address});
      }
      alert(e);
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
      <body className="container-home">
        <header className="header-home">
          <div className="header-home_text-header">Меню</div>
          <div className="header-home_personal-info">
            <div className="header-home_personal-info_name">{login}, {balance}</div>
            <p>{(role === '3')?'пользователь':'error'}</p>
            <Link className="header-home_personal-info_link" onClick={PersonalAccountSign}>Личный кабинет</Link>
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
          <div className="footer-home__button-exit">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/Login">
              <button onClick={LoggedOut}>
                <p>Выйти</p>
              </button>
            </Link>
          </div>
        </footer>
      </body>
    </>
  )
}
export default Home;