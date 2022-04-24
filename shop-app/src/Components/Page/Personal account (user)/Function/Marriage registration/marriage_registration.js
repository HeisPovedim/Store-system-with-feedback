import React from "react";
import { Link } from "react-router-dom";
import "./marriage_registration.css"

const Confirmation = () => {
  return(
    <>
      <header className="header-marriage-user">
        <div className="header-marriage-user__text-header">Оформление брака</div>
      </header>
      <div className="container-marriage-user">
        <div className="container-marriage-user-border-menu">
          <div className="container-marriage-user-border-menu__top-line"></div>
          <input className="container-marriage-user-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-marriage-user-border-menu-buttons">
            <button className="container-marriage-user-border-menu-buttons__accept">
              <p>Подтвердить</p>
            </button>
            <Link to="/PersonalAccountUser"><button className="container-marriage-user-border-menu-buttons__exit-button">
              <p>Выйти</p>
            </button></Link>
          </div>
          <div className="container-marriage-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;