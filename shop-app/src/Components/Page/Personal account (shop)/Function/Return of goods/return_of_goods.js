import React, { useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./return_of_goods.css"

const Return = () => {
//BEGIN - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОДА
  const { Contract } = UseContext();
  const [idReturn, setIdReturn] = useState();

  //Переменные из localStorage
  const address = localStorage.getItem("address");

  //Функция принятия возварата
  const AcceptReturnInc = async (e) => {
    try {
      alert("Выполняется подтверждение...")
      var structStatusReturn = await Contract.methods.structStatusReturns(idReturn).call();
      var structProduct = await Contract.methods.structProducts(structStatusReturn[1]).call();
      console.log("id возврата:", idReturn);
      await Contract.methods.acceptReturn(idReturn, true).send({ from:address, value:structProduct[2]});
      alert('Подтверждение выполнено!');
    } catch (e) {
      console.log(e);
    }
  }

  //Функция отклонения возврата
  const AcceptReturnDec = async (e) => {
    try {
      alert("Выполняется отклонение...")
      var structStatusReturn = await Contract.methods.structStatusReturn(idReturn).call();
      var structProduct = await Contract.methods.structProduct(structStatusReturn[1]).call();
      console.log("id возврата:", idReturn);
      await Contract.methods.acceptReturn(idReturn, false).send({ from:address, value:structProduct[2]});
      alert('Отклонение выполнено!');
    } catch (e) {
      console.log(e);
    }
  }
//END - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОДА
//BEGIN - HTML КОД
  return(
    <>
      <header className="header-return">
        <div className="header-return__text-header">Подтверждение или отклонение запроса покупателя на возврат товара</div>
      </header>
      <div className="container-return-seller">
        <div className="container-return-seller-border-menu">
          <div className="container-return-seller-border-menu__top-line"></div>
          <input onChange={ (e) => setIdReturn(e.target.value) } className="container-return-seller-border-menu__input-id" type="text" placeholder="id возврата"/>
          <div className="container-return-seller-border-menu-buttons">
            <button onClick={ AcceptReturnInc } className="container-return-seller-border-menu-buttons__accept">Подтвердить</button>
            <button onClick={ AcceptReturnDec } className="container-return-seller-border-menu-buttons__reject">Отклонить</button>
          </div>
          <Link to="/PersonalAccountShop"><button className="container-return-seller-border-menu__exit-button">Выйти</button></Link>
          <div className="container-return-seller-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
//END - HTML КОД
}

export default Return;