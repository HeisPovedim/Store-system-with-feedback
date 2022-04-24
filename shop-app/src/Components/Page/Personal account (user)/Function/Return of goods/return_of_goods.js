import React from "react";
import { Link } from "react-router-dom";
import "./return_of_goods.css"

const Confirmation = () => {
  return(
    <>
      <header className="header-return-user">
        <div className="header-return-user__text-header">Возврат товара</div>
      </header>
      <div className="container-return-user">
        <div className="container-return-user-border-menu">
          <div className="container-return-user-border-menu__top-line"></div>
          <input className="container-return-user-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-return-user-border-menu-buttons">
            <button className="container-return-user-border-menu-buttons__accept">
              <p>Подтвердить</p>
            </button>
            <Link to="/PersonalAccountUser"><button className="container-return-user-border-menu-buttons__exit-button">
              <p>Выйти</p>
            </button></Link>
          </div>
          <div className="container-return-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;