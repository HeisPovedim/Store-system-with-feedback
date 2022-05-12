import React, { useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./refusal_to_purchase.css"

const Confirmation = () => {
  const { Contract } = UseContext();
  const [purchase, setPurchase] = useState();

  //Переменные из localStorage
  const address = localStorage.getItem("address")

  //Функция отказа от ПОКУПКИ
  const RefusalToPurchase = async (e) => { 
    try {
      alert("Происходит отказ от покупки...");
      console.log(purchase);
      await Contract.methods.refusalToPurchase(purchase).send({ from: address });
      alert("Вы отказались от покупки, под id: " + purchase);
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
      <header className="header-purchase-user">
        <div className="header-purchase-user__text-header">Отказ от пукупки</div>
      </header>
      <div className="container-purchase-user">
        <div className="container-purchase-user-border-menu">
          <div className="container-purchase-user-border-menu__top-line"></div>
          <input onChange={ (e) => setPurchase(e.target.value) } className="container-purchase-user-border-menu__input-id" type="text" placeholder="id покупки"/>
          <div className="container-purchase-user-border-menu-buttons">
            <button onClick={ RefusalToPurchase } className="container-purchase-user-border-menu-buttons__accept">Подтвердить</button>
            <Link to="/PersonalAccountUser"><button className="container-purchase-user-border-menu-buttons__exit-button">Выйти</button></Link>
          </div>
          <div className="container-purchase-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;