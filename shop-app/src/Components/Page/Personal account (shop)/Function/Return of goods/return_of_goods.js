import React from "react";
import { Link } from "react-router-dom";
import "./return_of_goods.css"

const Return = () => {
  return(
    <>
      <header className="header-return">
        <div className="header-return__text-header">Подтверждение или отклонение запроса покупателя на возврат товара</div>
      </header>
      <div className="container-return-seller">
        <div className="container-return-seller-border-menu">
          <div className="container-return-seller-border-menu__top-line"></div>
          <input className="container-return-seller-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-return-seller-border-menu-buttons">
            <button className="container-return-seller-border-menu-buttons__accept">
              <p>Подтвердить</p>
            </button>
            <button className="container-return-seller-border-menu-buttons__reject">
              <p>Отклонить</p>
            </button>
          </div>
          <Link to="/PersonalAccountShop"><button className="container-return-seller-border-menu__exit-button">
            <p>Выйти</p>
          </button></Link>
          <div className="container-return-seller-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Return;