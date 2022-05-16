import React, {useEffect, useState} from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from 'react-router-dom'
import "./productFeedback.css"

const Beer = () => {
  const { Contract } = UseContext();
  const [listItems, setlistItems] = useState([]);
  const [list, setList] = useState([]);
  
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