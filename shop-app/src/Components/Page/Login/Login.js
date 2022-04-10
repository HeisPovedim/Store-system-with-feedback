import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseContext  } from "../../Contract/context";
import './login.css';

const Login = () => {
  const { web3, Contract } = UseContext();
  const [Accounts, setAccounts] = useState([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const hadlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = (e) => {
    setLogin(e.target.value)
  }

  const Authorisation = async(e) => {
    e.preventDefault()
    try {
      await web3.eth.personal.unlockAccount(login, password, 0)
      web3.eth.defaultAccount = login;
      sessionStorage.setItem("address", login)
      //await reLogin()
      alert("Вы авторизовались")
    } catch(e) {
      alert(e)
    }
  }

  return(
      <>
      <div className="border-login">
        <div className="border-login__line-top"></div>
        <div className="border-login__text">Вход</div>
        <form onSubmit={Authorisation}>
          <input onChange={handleLogin} type="text" placeholder="Логин"/>
          <input onChange={hadlePassword} type="password" placeholder="Пароль"/>
          <button className="border-login__button-login">
            <p>Войти</p>
          </button>
          <button className="login-border__button-signIn">
            <p>Зарегестрироваться</p>
          </button>
        </form>
        <div className="border-login__line-button"></div>
      </div>
    </>
  );
};

export default Login;