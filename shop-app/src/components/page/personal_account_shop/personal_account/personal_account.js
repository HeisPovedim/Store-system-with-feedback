import React, { useEffect, useState } from "react";
import { UseContext } from "../../../contract/context";
import { Link } from "react-router-dom";
import "./personal_account.css"

const Seller = () => {
  //Stat'ы
  const { Contract } = UseContext();
  const [balance, setBalance] = useState();
  const [countComments, setCountComments] = useState();

  //Перменные из localStorage
  const login = localStorage.getItem('login');
  const address = localStorage.getItem('address');
  const role = localStorage.getItem("role");
  const city = localStorage.getItem("city");
  const shopNumber = localStorage.getItem("shopNumber");

  //Функция получение баланса
  const getBalance = async () => {
    const getBalance = await Contract.methods.get_balance(address).call();
    setBalance(getBalance);
  }
  //Функция получения кол-ва отзывов
  const getComments = async () => {
    const countComments = await Contract.methods.get_complaintBooks(login).call();
    setCountComments(countComments);
  }
  const getFeedbach = async () => {
    let id = prompt("Введите id отзыва:", undefined);
    const feedback = await Contract.methods.get_complaintBooks_feedback(login, id).call();

    
    alert("Отзыв: " + feedback);
  }
  //Хук эффект
  useEffect(() => {
    getBalance();
    getComments();
  },)
  
  return (
    <>
      <header className="header-page-seller">
        <div className="header-page-seller_text-header">Личный кабинет</div>
        <div className="header-page-seller_text-role">Роль: {role}</div>
      </header>
      <div className="container-page-seller">
        <div className="container-page-seller__personal-information">
          <div className="container-page-seller__personal-information_text-title">Личная информация:</div>
          <div className="container-page-seller__personal-information_text-base">Имя: {login}</div>
          <div className="container-page-seller__personal-information_text-base">Баланс: {(balance/10**18).toFixed(4)} eth</div>
          <div className="container-page-seller__personal-information_text-base">Город: {city}</div>
          <div className="container-page-seller__personal-information_text-base">Номер: {shopNumber}</div>
          <div className="container-page-seller__personal-information_text-base">Кол-во отзывов: {countComments}</div>
          <button onClick={ getFeedbach }>Получить отзывы</button>
        </div>
        <div className="container-page-seller__function-menu">
          <div className="container-page-seller__function-menu_text-top">Функции продовца</div>
          <Link to="/ProductCreation"><button className="container-page-seller__function-menu_button-one">Создание товара</button></Link>
          <Link to="/ConfirmationSeller"><button className="container-page-seller__function-menu_button-two">Подтверждение или отклонение запроса покупателя на покупку</button></Link>
          <Link to="/ReturnSeller"><button className="container-page-seller__function-menu_button-three">Подтверждение или отклонение запроса покупателя на возврат товара</button></Link>
          <Link to="/MarriageSeller"><button className="container-page-seller__function-menu_button-four">Подтверждение или отклонение запроса покупателя на оформление брака</button></Link>
          <Link to="/Comment"><button className="container-page-seller__function-menu_button-one">Оставить комментарий</button></Link>
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