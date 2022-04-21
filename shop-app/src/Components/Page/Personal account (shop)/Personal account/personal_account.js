import React, { useEffect, useState } from "react";
import { UseContext } from "../../../Contract/context";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./personal_account.css"

const Seller = () => {
  const history = useHistory();
  const { web3, Contract } = UseContext();
  const [balance, setBalance] = useState();
  const [role, setRole] = useState();
  const [city, setCity] = useState('');
  const [shopNumber, setShopNumber] = useState('');
  const login = localStorage.getItem('login')
  

  useEffect( () => {
    setBalance(localStorage.getItem('balance'));
    setRole(localStorage.getItem('role'));
    setCity(localStorage.getItem('city'));
    setShopNumber(localStorage.getItem('shopNumber'));

  },[])
  return (
    <>
      <header className="header-page-seller">
        <div className="header-page-seller_text-header">Личный кабинет</div>
        <div className="header-page-seller_text-role">Роль: {role}</div>
      </header>
      <div className="container-page-seller">
        <div className="container-page-seller__personal-information">
          <div className="container-page-seller__personal-information_text-top">Личная информация:</div>
          <div className="container-page-seller__personal-information_text-name">Имя: {login}</div>
          <div className="container-page-seller__personal-information_text-login">Баланс: {balance}</div>
          <div className="container-page-seller__personal-information_text-city">Город: {city}</div>
          <div className="container-page-seller__personal-information_text-shop">Номер: {shopNumber}</div>
        </div>
        <div className="container-page-seller__function-menu">
          <div className="container-page-seller__function-menu_text-top">Функции продовца</div>
          <Link to="/ProductCreation"><button className="container-page-seller__function-menu_button-one">Создание товара</button></Link>
          <Link to="/ConfirmationSeller"><button className="container-page-seller__function-menu_button-two">Подтверждение или отклонение запроса покупателя на покупку</button></Link>
          <Link to="/Return"><button className="container-page-seller__function-menu_button-three">Подтверждение или отклонение запроса покупателя на возврат товара</button></Link>
          <Link to="/Marriage"><button className="container-page-seller__function-menu_button-four"> Подтверждение или отклонение запроса покупателя на оформление брака</button></Link>
          <button className="container-page-seller__function-menu_button-five">Получить список запросов от покупателей</button>
        </div>
      </div>
    </>
  );
};

export default Seller;