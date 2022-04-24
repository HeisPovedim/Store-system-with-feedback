import React from "react";
import { Link } from "react-router-dom";
import "./refusal_to_purchase.css"

const Confirmation = () => {
  return(
    <>
      <header className="header-purchase-user">
        <div className="header-purchase-user__text-header">Отказ от пукупки</div>
      </header>
      <div className="container-purchase-user">
        <div className="container-purchase-user-border-menu">
          <div className="container-purchase-user-border-menu__top-line"></div>
          <input className="container-purchase-user-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-purchase-user-border-menu-buttons">
            <button className="container-purchase-user-border-menu-buttons__accept">
              <p>Подтвердить</p>
            </button>
            <Link to="/PersonalAccountUser"><button className="container-purchase-user-border-menu-buttons__exit-button">
              <p>Выйти</p>
            </button></Link>
          </div>
          <div className="container-purchase-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;