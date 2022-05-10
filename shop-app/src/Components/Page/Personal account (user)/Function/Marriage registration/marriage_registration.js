import React, { useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./marriage_registration.css"

const Confirmation = () => {
//BEGIN - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОДА
  const { Contract } = UseContext();
  const [productMarriage, setProductMarriage] = useState("");

  //Переменные из localStorage
  const address = localStorage.getItem("address");

  //Функция оформления БРАКА
  const ProductMarriage = async (e) => {
    try {
      alert("Происходит оформление возврата...");
      console.log("Название продукта: " + productMarriage);
      await Contract.methods.productMarriage(productMarriage).send({ from: address });
      alert("Вы оформили возврат!");
    } catch (e) {
      alert(e);
    }
  }
//END - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОДА
//BEGIN - HTML КОД
  return(
    <>
      <header className="header-marriage-user">
        <div className="header-marriage-user__text-header">Оформление брака</div>
      </header>
      <div className="container-marriage-user">
        <div className="container-marriage-user-border-menu">
          <div className="container-marriage-user-border-menu__top-line"></div>
          <input onChange={ (e) => setProductMarriage(e.target.value) } className="container-marriage-user-border-menu__input-id" type="text" placeholder="название продукта"/>
          <div className="container-marriage-user-border-menu-buttons">
            <button onClick={ ProductMarriage } className="container-marriage-user-border-menu-buttons__accept">Оформить</button>
            <Link to="/PersonalAccountUser"><button className="container-marriage-user-border-menu-buttons__exit-button">Выйти</button></Link>
          </div>
          <div className="container-marriage-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
//END - HTML КОД
}

export default Confirmation;