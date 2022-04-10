import React from "react";
import { Link } from "react-router-dom";
import "./product_creation.css"

const Return = () => {
  return(
    <>
      <header className="header-page-creation">
        <div className="header-page-creation_text-header">Создание товара</div>
        <div className="header-page-creation_text-role">Роль: магазин</div>
      </header>
      <div className="container-page-creation">
        <div className="container-page-creation__border-menu">
          <div className="container-page-creation__border-menu_top-line"></div>
          <input className="container-page-creation__border-menu_input-name" type="text" placeholder="название"/>
          <input className="container-page-creation__border-menu_input-description" type="text" placeholder="описание"/>
          <input className="container-page-creation__border-menu_input-price" type="text" placeholder="цена"/>
          <div className="container-page-creation__border-menu_buttons">
            <button className="container-page-creation__border-menu_buttons_accept">
              <p>Создать</p>
            </button>
            <Link to="seller"><button className="container-page-creation__border-menu_exit-button">
            <p>Выйти</p>
          </button></Link>
          </div>
          <div className="container-page-creation__border-menu_bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Return;