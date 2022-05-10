import React, { useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./marriage_registration.css"

const Marriage = () => {
//BEGIN - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОД
  const { Contract } = UseContext();
  const [idMarriage, setIdMarriage] = useState();

  //Переменные из localStorage
  const address = localStorage.getItem("address");

//Функция принятия возварата
  const AcceptReturnInc = async (e) => {
    try {
      alert("Выполняется подтверждение...")
      var structStatusMarriages = await Contract.methods.structStatusMarriages(idMarriage).call();
      var structProduct = await Contract.methods.structProducts(structStatusMarriages[1]).call();
      console.log("id брака:", idMarriage);
      await Contract.methods.acceptReturn(idMarriage, 1).send({ from:address, value:structProduct[2]} );
      alert('Подтверждение выполнено!');
    } catch (e) {
      console.log(e);
    }
  }

  //Функция отклонения возврата
  const AcceptReturnDec = async (e) => {
    try {
      alert("Выполняется отклонение...")
      var structStatusReturn = await Contract.methods.structStatusReturn(idMarriage).call();
      var structProduct = await Contract.methods.structProduct(structStatusReturn[1]).call();
      console.log("id брака:", idMarriage);
      await Contract.methods.acceptReturn(idMarriage, 0).send({ from:address, value:structProduct[2]} );
      alert('Отклонение выполнено!');
    } catch (e) {
      console.log(e);
    }
  }



//END - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОД
  return(
    <>
      <header className="header-marriage">
        <div className="header-marriage__text-header">Подтверждение или отклонение запроса покупателя на оформление брака</div>
      </header>
      <div className="container-marriage-seller">
        <div className="container-marriage-seller-border-menu">
          <div className="container-marriage-seller-border-menu__top-line"></div>
          <input onChange={ (e) => setIdMarriage(e.target.value) } className="container-marriage-seller-border-menu__input-id" type="text" placeholder="id брака"/>
          <div className="container-marriage-seller-border-menu-buttons">
            <button onClick={ AcceptReturnInc } className="container-marriage-seller-border-menu-buttons__accept">Подтвердить</button>
            <button onClick={ AcceptReturnDec } className="container-marriage-seller-border-menu-buttons__reject">Отклонить</button>
          </div>
          <Link to="/PersonalAccountShop"><button className="container-marriage-seller-border-menu__exit-button">Выйти</button></Link>
          <div className="container-marriage-seller-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Marriage;