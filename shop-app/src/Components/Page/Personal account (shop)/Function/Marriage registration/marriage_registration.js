import React from "react";
import { Link } from "react-router-dom";
import "./marriage_registration.css"

const Marriage = () => {
  return(
    <>
      <header className="header-page-marriage">
        <div className="header-page-marriage_text-header">Подтверждение или отклонение запроса покупателя на оформление брака</div>
        <div className="header-page-marriage_text-role">Роль: магазин</div>
      </header>
      <div className="container-page-marriage">
        <div className="container-page-marriage__border-menu">
          <div className="container-page-marriage__border-menu_top-line"></div>
          <input className="container-page-marriage__border-menu_input-id" type="text" placeholder="id покупки"/>
          <div className="container-page-marriage__border-menu_buttons">
          <button className="container-page-marriage__border-menu_buttons_accept">
              <p>Подтвердить</p>
            </button>
            <button className="container-page-marriage__border-menu_buttons_reject">
              <p>Отклонить</p>
            </button>
          </div>
          <Link to="seller"><button className="container-page-marriage__border-menu_exit-button">
            <p>Выйти</p>
          </button></Link>
          <div className="container-page-marriage__border-menu_bottom-line"></div>
          </div>
        </div>
    </>
  )
}

export default Marriage;