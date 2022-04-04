import React from "react";
import "./confirmation_or_rejection.css"

const Confirmation = () => {
  return(
    <>
      <header className="header-page-confirmation">
        <div className="header-page-confirmation_text-header">Личный кабинет</div>
        <div className="header-page-confirmation_text-role">Роль: продавец</div>
      </header>
      <div className="container-page-confirmation">
        <div className="container-page-confirmation__border-menu">
          <div className="container-page-confirmation__border-menu_top-line"></div>
          <input className="container-page-confirmation__border-menu_input-id" type="text" placeholder="id покупки"/>
          <div className="container-page-confirmation__border-menu_buttons">
            <button className="container-page-confirmation__border-menu_buttons_accept">
              <p>Подтвердить</p>
            </button>
            <button className="container-page-confirmation__border-menu_buttons_reject">
              <p>Отклонить</p>
            </button>
          </div>
          <div className="container-page-confirmation__border-menu_bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;