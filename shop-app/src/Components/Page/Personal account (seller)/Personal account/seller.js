import React from "react";
import { Link } from "react-router-dom";
import "./seller.css"

const Seller = () => {
  return (
    <>
      <header className="header-page-seller">
        <div className="header-page-seller_text-header">Личный кабинет</div>
        <div className="header-page-seller_text-role">Роль: магазин</div>
      </header>
      <div className="container-page-seller">
        <div className="container-page-seller__personal-information">
          <div className="container-page-seller__personal-information_text-top">Личная информация:</div>
          <div className="container-page-seller__personal-information_text-name">Имя: {}</div>
          <div className="container-page-seller__personal-information_text-login">Логин: {}</div>
          <div className="container-page-seller__personal-information_text-city">Город: {}</div>
          <div className="container-page-seller__personal-information_text-shop">Магазин: {}</div>
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