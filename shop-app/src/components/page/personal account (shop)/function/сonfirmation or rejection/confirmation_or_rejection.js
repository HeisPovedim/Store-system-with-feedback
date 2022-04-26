import React, { useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./confirmation_or_rejection.css"

const Confirmation = () => {
  const { Contract } = UseContext();
  const [purchase, setPurchase] = useState();
  const [test, setTest] = useState();

  //Переменные из localStorage
  const address = localStorage.getItem("address")

  //Функции обработчика событий
  const handlPurchase = (e) => {
    setPurchase(e.target.value)
    console.log(purchase);
  }

  const AcceptPurchase = async (e) => {
    try {
      alert("Выполняется подтверждение!")
      await Contract.methods.acceptPurchase(purchase, test).send({from:address});
      console.log(true);
      alert(e);
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
      <header className="header-confirmation-seller">
        <div className="header-confirmation-seller__text-header">Подтверждение или отклонение запроса покупателя на покупку</div>
      </header>
      <div className="container-confirmation-seller">
        <div className="container-confirmation-seller-border-menu">
          <div className="container-confirmation-seller-border-menu__top-line"></div>
          <input onChange={handlPurchase} className="container-confirmation-seller-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-confirmation-seller-border-menu-buttons">
            <button onChange={(e) => setTest(true)} onClick={AcceptPurchase} className="container-confirmation-seller-border-menu-buttons__accept">
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