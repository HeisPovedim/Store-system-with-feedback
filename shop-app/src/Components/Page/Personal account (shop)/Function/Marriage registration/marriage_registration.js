import React from "react";
import { Link } from "react-router-dom";
import "./marriage_registration.css"

const Marriage = () => {
  return(
    <>
      <header className="header-marriage">
        <div className="header-marriage__text-header">Подтверждение или отклонение запроса покупателя на оформление брака</div>
      </header>
      <div className="container-marriage-seller">
        <div className="container-marriage-seller-border-menu">
          <div className="container-marriage-seller-border-menu__top-line"></div>
          <input className="container-marriage-seller-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-marriage-seller-border-menu-buttons">
          <button className="container-marriage-seller-border-menu-buttons__accept">
              <p>Подтвердить</p>
            </button>
            <button className="container-marriage-seller-border-menu-buttons__reject">
              <p>Отклонить</p>
            </button>
          </div>
          <Link to="/PersonalAccountShop"><button className="container-marriage-seller-border-menu__exit-button">
            <p>Выйти</p>
          </button></Link>
          <div className="container-marriage-seller-border-menu__bottom-line"></div>
          </div>
        </div>
    </>
  )
}

export default Marriage;