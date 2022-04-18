import React from "react";
import { Link } from "react-router-dom";
import "./personal_account.css"

const Seller = () => {
  return (
    <>
      <header className="header-page-user">
        <div className="header-page-user_text-header">Личный кабинет</div>
        <div className="header-page-user_text-role">Роль: магазин</div>
      </header>
      <div className="container-page-user">
        <div className="container-page-user__personal-information">
          <div className="container-page-user__personal-information_text-top">Личная информация:</div>
          <div className="container-page-user__personal-information_text-name">Имя: Beer</div>
          <div className="container-page-user__personal-information_text-login">Баланс: 1000</div>
          <div className="container-page-user__personal-information_text-city">Город: Moscow</div>
          <div className="container-page-user__personal-information_text-shop">Номер: 1</div>
        </div>
        <div className="container-page-user__function-menu">
          <div className="container-page-user__function-menu_text-top">Функции продовца</div>
          <Link to="/ProductCreation"><button className="container-page-user__function-menu_button-one">Создание товара</button></Link>
          <Link to="/ConfirmationSeller"><button className="container-page-user__function-menu_button-two">Подтверждение или отклонение запроса покупателя на покупку</button></Link>
          <Link to="/Return"><button className="container-page-user__function-menu_button-three">Подтверждение или отклонение запроса покупателя на возврат товара</button></Link>
          <Link to="/Marriage"><button className="container-page-user__function-menu_button-four"> Подтверждение или отклонение запроса покупателя на оформление брака</button></Link>
          <button className="container-page-user__function-menu_button-five">Получить список запросов от покупателей</button>
        </div>
      </div>
    </>
  );
};

export default Seller;