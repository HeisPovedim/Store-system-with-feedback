import React, { useEffect, useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./confirmation_or_rejection.css"

const Confirmation = () => {
  const { Contract } = UseContext();
  const [purchase, setPurchase] = useState();
  const [confirmation, setConfirmation] = useState();

  //Переменные из localStorage
  const address = localStorage.getItem("address")

  const AcceptPurchaseInc = async (e) => {
    try {
      alert("Выполняется подтверждение...")
      console.log("purchase:", purchase);
      console.log("confirmation:", confirmation);
      await Contract.methods.acceptPurchase(purchase, 1).send({from:address});
      alert('Подтверждение выполнено!');
    } catch (e) {
      console.log(e);
    }
  }

  const AcceptPurchaseDec = async (e) => {
    try {
      alert("Выполняется подтверждение...")
      console.log("purchase:", purchase);
      console.log("confirmation:", confirmation);
      await Contract.methods.acceptPurchase(purchase, 0).send({from:address});
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
          <input onChange={ (e) => setPurchase(e.target.value) } className="container-confirmation-seller-border-menu__input-id" placeholder="id покупки"/>
          <div className="container-confirmation-seller-border-menu-buttons">
            <button onClick = { AcceptPurchaseInc } className = "container-confirmation-seller-border-menu-buttons__accept" >Подтвердить</button>
            <button onClick = { AcceptPurchaseDec } className="container-confirmation-seller-border-menu-buttons__reject">Отклонить</button>
          </div>
          <Link to="/PersonalAccountShop"><button className="container-confirmation-seller-border-menu__exit-button">Выйти</button></Link>
          <div className="container-confirmation-seller-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;