import React, { useEffect, useState } from "react";
import { UseContext } from "../../../contract/context";
import { Link } from "react-router-dom";
import "./personal_account.css"

const Seller = () => {
  const { Contract } = UseContext();
  const [balance, setBalance] = useState();
  const [role, setRole] = useState();
  const [city, setCity] = useState('');
  const [shopNumber, setShopNumber] = useState('');
  const login = localStorage.getItem('login');
  const address = localStorage.getItem('address');
  
  //Хук эффект
  useEffect(() => {
    setRole(localStorage.getItem('role'));
    setCity(localStorage.getItem('city'));
    setShopNumber(localStorage.getItem('shopNumber'));
    async function fetchData() {
      const getBalance = await Contract.methods.get_balance(address).call();
      setBalance(getBalance);
    }
    fetchData();
  },)
  
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
          <div className="container-page-seller__personal-information_text-login">Баланс: {(balance/10**18).toFixed(4)} eth</div>
          <div className="container-page-seller__personal-information_text-city">Город: {city}</div>
          <div className="container-page-seller__personal-information_text-shop">Номер: {shopNumber}</div>
        </div>
        <div className="container-page-seller__function-menu">
          <div className="container-page-seller__function-menu_text-top">Функции продовца</div>
          <Link to="/ProductCreation"><button className="container-page-seller__function-menu_button-one">Создание товара</button></Link>
          <Link to="/ConfirmationSeller"><button className="container-page-seller__function-menu_button-two">Подтверждение или отклонение запроса покупателя на покупку</button></Link>
          <Link to="/ReturnSeller"><button className="container-page-seller__function-menu_button-three">Подтверждение или отклонение запроса покупателя на возврат товара</button></Link>
          <Link to="/MarriageSeller"><button className="container-page-seller__function-menu_button-four"> Подтверждение или отклонение запроса покупателя на оформление брака</button></Link>
          <button className="container-page-seller__function-menu_button-five">Получить список запросов от покупателей</button>
        </div>
      </div>
      <footer className="footer-page-seller">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/Home">
            <button>
              <p>Выйти</p>
            </button>
          </Link>
        </footer>
    </>
  );
};

export default Seller;