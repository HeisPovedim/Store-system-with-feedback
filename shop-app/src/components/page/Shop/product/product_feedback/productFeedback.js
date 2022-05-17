import React, {useEffect, useState} from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from 'react-router-dom'
import "./productFeedback.css"

const Beer = () => {
  const { Contract } = UseContext();
  const [listItems, setlistItems] = useState([]);
  const [list, setList] = useState([]);
  
  //Переменные из localStorage
  const address = localStorage.getItem('address');
  const role = localStorage.getItem("role")
  
  //Функция ответа на отзыв
  const AnswerFeedback = async () => {
    console.log(role)
    try {
      const confirm = window.confirm("Вы хотите оставить отзыв?")
      if (confirm === true) {
        if (role === "3") {
          const comment = prompt("Введите комментарий:", undefined);
          const idFeedbach = prompt("Введите id отзыва:", undefined);
          await Contract.methods.leaveComment(comment, idFeedbach).send({from: address})
        } else {
          alert("На отзывы может ответить только админ!")
        }
      }
    } catch (e) {
      alert(e);
    }
  }

  //Функция получения отзыва
  const GetFeedback = async () => {
    setList(await Contract.methods.get_complaintBooks_adrShop("Product").call())
    console.log(list)
    setlistItems(list.map((element, id) =>
      <div className="borderList">
        <p>ID Отзывы №{ id } от пользователя { element.user } </p>
        <p>Магазин: { element.shop }</p>
        <p>Отзыв: { element.feedback} </p>
        <p>Рейтинг: { element.rating }</p>
        <p>комментарии: { element.comment }</p>
        <p>Статус: {element.status}</p>
      </div>
      )
    )
  }

  useEffect(() => {
    GetFeedback();
  },[])

  return(
    <>
      <div className="container-page-beer">
        <header className="container-page-beer__header-shop-beer">
          <div className="container-page-beer__header-shop-beer_text-header">Ассортимент</div>
          <div className="container-page-beer__header-shop-beer_personal-info">
          </div>
        </header>
        <div className="container-page-beer__menu">
          <div className="ListRequests">
            <h1>Список отзывов:</h1>
            {listItems}
            <button onClick={GetFeedback}>ОБНОВИТЬ</button>
            <button onClick={AnswerFeedback}>Ответить на отзыв</button>
          </div>
        </div>
        <div className="container-page-beer__but-info">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/Home">
            <button>Выйти</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Beer;