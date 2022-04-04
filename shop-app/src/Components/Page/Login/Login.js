import React from "react";
import './login.css';

const Login = () => {
  return(
      <>
      <div className="border-login">
        <div className="border-login__line-top"></div>
        <div className="border-login__text">Вход</div>
        <input type="text" placeholder="Логин"/>
        <input type="password" placeholder="Пароль"/>
        <button className="border-login__button-login">
          <p>Войти</p>
        </button>
        <button className="login-border__button-signIn">
          <p>Зарегестрироваться</p>
        </button>
        <div className="border-login__line-button"></div>
      </div>
    </>
  );
};

export default Login;