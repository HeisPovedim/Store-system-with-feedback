import React from "react";
import { Link } from "react-router-dom";
import "./return_of_goods.css"

const Return = () => {
  return(
    <>
      <header className="header-page-return">
        <div className="header-page-return_text-header">Подтверждение или отклонение запроса покупателя на возврат товара</div>
        <div className="header-page-return_text-role">Роль: магазин</div>
      </header>
      <div className="container-page-return">
        <div className="container-page-return__border-menu">
          <div className="container-page-return__border-menu_top-line"></div>
          <input className="container-page-return__border-menu_input-id" type="text" placeholder="id покупки"/>
          <div className="container-page-return__border-menu_buttons">
            <button className="container-page-return__border-menu_buttons_accept">
              <p>Подтвердить</p>
            </button>
            <button className="container-page-return__border-menu_buttons_reject">
              <p>Отклонить</p>
            </button>
          </div>
          <Link to="seller"><button className="container-page-return__border-menu_exit-button">
            <p>Выйти</p>
          </button></Link>
          <div className="container-page-return__border-menu_bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Return;