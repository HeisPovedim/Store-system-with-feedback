import React from "react";
import './login.css';

const Login = () => {
  return(
      <>
      <div className="border-login">
        <div className="border-login-line-top"></div>
        <div className="border-login-text">Вход</div>
        <div className="border-login-inputLine-login">
          <p>логин</p>
        </div>
        <div className="border-login-inputLine-password">
          <p>пароль</p>
        </div>
        <button className="border-login-button-login">
          <p>Войти</p>
        </button>
        <button className="login-border-button-signIn">
          <p>Зарегестрироваться</p>
        </button>
        <div className="border-login-line-button"></div>
      </div>
    </>
  );
};

export default Login;