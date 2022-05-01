import React, { useEffect, useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./confirmation_or_rejection.css"

const Confirmation = () => {
  const { Contract } = UseContext();
  const [purchase, setPurchase] = useState();
  const [confirmation, setConfirmation] = useState();

  useEffect(() => {
    console.log(purchase);
  })

  //Переменные из localStorage
  const address = localStorage.getItem("address")

  const AcceptPurchase = async (e) => {
    try {
      alert("Выполняется подтверждение...")
      await Contract.methods.acceptPurchase(purchase, confirmation).send({from:address});
      console.log(confirmation);
      alert('Подтверждение выполнено!');
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
          <input onChange={ (e) => setPurchase(e.target.value) } className="container-confirmation-seller-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-confirmation-seller-border-menu-buttons">
            <button onChange={ (e) => setConfirmation(true) } onClick={AcceptPurchase} className="container-confirmation-seller-border-menu-buttons__accept">
              <p>Подтвердить</p>
            </button>
            <button onChange={ (e) => setConfirmation(false) } onClick={AcceptPurchase} className="container-confirmation-seller-border-menu-buttons__reject">
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