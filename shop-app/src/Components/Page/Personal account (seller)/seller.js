import React from "react";
import "./seller.css"

const seller = () => {
  return (
    <>
      <header className="header-page-seller">
        <div className="header-page-seller_text-header">Личный кабинет</div>
        <div className="header-page-seller_text-role">Роль: продавец</div>
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
          <button className="container-page-seller__function-menu_button-one">Запрос на повышение</button>
          <button className="container-page-seller__function-menu_button-two">Переключится к роли покупателя</button>
          <button className="container-page-seller__function-menu_button-three">Запрос на понижение до роли покупателя</button>
          <button className="container-page-seller__function-menu_button-four">Подтверждение или отклонение запроса покупателя</button>
          <button className="container-page-seller__function-menu_button-five">Возврат товара</button>
          <button className="container-page-seller__function-menu_button-six">Оформление брака</button>
          <button className="container-page-seller__function-menu_button-seven">Получить список запросов от покупателей</button>
        </div>
      </div>
    </>
  );
};

export default seller;