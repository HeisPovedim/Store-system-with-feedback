import React from "react";
import { Link } from "react-router-dom";
import "./confirmation_or_rejection.css"

const Confirmation = () => {
  return(
    <>
      <header className="header-confirmation-seller">
        <div className="header-confirmation-seller__text-header">Подтверждение или отклонение запроса покупателя на покупку</div>
      </header>
      <div className="container-confirmation-seller">
        <div className="container-confirmation-seller-border-menu">
          <div className="container-confirmation-seller-border-menu__top-line"></div>
          <input className="container-confirmation-seller-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-confirmation-seller-border-menu-buttons">
            <button className="container-confirmation-seller-border-menu-buttons__accept">
              <p>Подтвердить</p>
            </button>
            <button className="container-confirmation-seller-border-menu-buttons__reject">
              <p>Отклонить</p>
            </button>
          </div>
          <Link to="/PersonalAccountShop"><button className="container-confirmation-seller-border-menu__exit-button">
            <p>Выйти</p>
          </button></Link>
          <div className="container-confirmation-seller-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;