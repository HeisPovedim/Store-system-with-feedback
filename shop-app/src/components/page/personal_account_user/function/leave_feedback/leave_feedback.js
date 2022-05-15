import React, { useState, useEffect } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./leave_feedback.css"

const Feedback = () => {
//BEGIN - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОДА
  //Stat'ы
  const { Contract } = UseContext();
  const [arrayProduct, setArrayProduct] = useState([]);
  const [shopName, setShopName] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState();

  //Переменные из localStorage
  const address = localStorage.getItem("address");

//UseEffect - адресов
  useEffect(() => {
    const ListarrayProduct = async() => {
      let arrayProduct = await Contract.methods.get_shop_list().call();
      setArrayProduct(arrayProduct);
      setShopName(arrayProduct[0]);
    }
    ListarrayProduct();
  })

  //Функция оформления БРАКА
  const Feedback = async (e) => {
    try {
      alert("Происходит формирование отзыва...");
      await Contract.methods.leaveFeedback(shopName, feedback, rating).send({ from: address });
      alert("Вы оформили отзыв!");
    } catch (e) {
      alert(e);
    }
  }
//END - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОДА
//BEGIN - HTML КОД
  return(
    <>
      <header className="header-feedback-user">
        <div className="header-feedback-user__text-header">Формирование отзыва</div>
      </header>
      <div className="container-feedback-user">
        <div className="container-feedback-user-border-menu">
          <div className="container-feedback-user-border-menu__top-line"></div>
          <select onChange={ (e) => setShopName(e.target.value) } className="menu__products-select" style={{ fontSize: '18px'}}>
            {arrayProduct.map((arr,i) => <option key={i} value={String(arr)}> { arr } </option>)}
          </select>
          <input onChange={ (e) => setFeedback(e.target.value) } className="container-feedback-user-border-menu__input-id" type="text" placeholder="отзыв"/>
          <input onChange={ (e) => setRating(e.target.value) } className="container-feedback-user-border-menu__input-id" type="text" placeholder="рейтин от 1 до 10"/>
          <div className="container-feedback-user-border-menu-buttons">
            <button onClick={ Feedback } className="container-feedback-user-border-menu-buttons__accept">Оставить отзыв</button>
            <Link to="/PersonalAccountUser"><button className="container-feedback-user-border-menu-buttons__exit-button">Выйти</button></Link>
          </div>
          <div className="container-feedback-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
//END - HTML КОД
}

export default Feedback;