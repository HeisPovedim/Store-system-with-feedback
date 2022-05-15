import React, { useState, useEffect } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./leave_comment.css"

const Comment = () => {
  //Stat'ы
  const { Contract } = UseContext();
  const [leaveComment, setLeaveComment] = useState("");
  const [idFeedbach, setIdFeedbach] = useState();

  //Переменные из localStorage
  const address = localStorage.getItem("address")

  //Функция оформления коментария к отзыву
  const LeaveComment = async (e) => {
    try {
      alert("Происходит оформление комментария...");
      await Contract.methods.leaveComment(leaveComment, idFeedbach).send({ from:address });
      alert("Комментарий оформлен...");
    } catch (e) {
      alert(e);
    }
  }

  return(
    <>
      <header className="header-comment-user">
        <div className="header-comment-user__text-header">Отзывы</div>
      </header>
      <div className="container-return-user">
        <div className="container-comment-user-border-menu">
          <div className="container-comment-user-border-menu__top-line"></div>
          {/* <select onChange={ (e) => setAdrShop(e.target.value) } className="menu__products-select" style={{ fontSize: '18px'}}>
            {arrayProduct.map((arr,i) => <option key={i} value={String(arr)}> { arr } </option>)}
          </select> */}
          <input onChange={ (e) => setLeaveComment(e.target.value) } className="container-comment-user-border-menu__input-id" type="text" placeholder="комментарий"/>
          <input onChange={ (e) => setIdFeedbach(e.target.value) } className="container-comment-user-border-menu__input-id" type="text" placeholder="id отзыва"/>
          <div className="container-comment-user-border-menu-buttons">
            <button onClick={ LeaveComment } className="container-comment-user-border-menu-buttons__accept">Подтвердить</button>
            <Link to="/PersonalAccountShop"><button className="container-comment-user-border-menu-buttons__exit-button">Выйти</button></Link>
          </div>
          <div className="container-comment-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Comment;