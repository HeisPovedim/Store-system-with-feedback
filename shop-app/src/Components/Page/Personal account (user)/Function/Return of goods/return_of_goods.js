import React, { useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./return_of_goods.css"

const Confirmation = () => {
  const { Contract } = UseContext();
  const [productReturn, setProductReturn] = useState("");
  //Переменные из localStorage
  const address = localStorage.getItem("address")

  //Функция оформления ВОЗВРАТА
  const ProductReturn = async (e) => {
    try {
      alert("Происходит оформление возврата...");
      console.log("Название продукта: " + productReturn);
      await Contract.methods.productReturn(productReturn).send({ from: address });
      alert("Вы оформили возврат!");
    } catch (e) {
      alert(e);
    }
  }

  return(
    <>
      <header className="header-return-user">
        <div className="header-return-user__text-header">Возврат товара</div>
      </header>
      <div className="container-return-user">
        <div className="container-return-user-border-menu">
          <div className="container-return-user-border-menu__top-line"></div>
          <input onChange={ (e) => setProductReturn(e.target.value) } className="container-return-user-border-menu__input-id" type="text" placeholder="название продукта"/>
          <div className="container-return-user-border-menu-buttons">
            <button onClick={ ProductReturn } className="container-return-user-border-menu-buttons__accept">Подтвердить</button>
            <Link to="/PersonalAccountUser"><button className="container-return-user-border-menu-buttons__exit-button">Выйти</button></Link>
          </div>
          <div className="container-return-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;