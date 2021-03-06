/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { UseContext } from '../../../../contract/context'
import { Link } from 'react-router-dom'
import './beerFeedback.css'

const Beer = () => {
  // Stat'ы && Context'ы
  const { Contract } = UseContext()
  const [listItems, setlistItems] = useState([])
  
  // Переменные из localStorage
  const address = localStorage.getItem('address')
  const role = localStorage.getItem("role")
  const login = localStorage.getItem("login")
  
  // Функция ответа на отзыв
  const AnswerFeedback = async () => {
    console.log(role)
    try {
      if (role === "3") {
        if("Beer" === login) {
          const confirm = window.confirm("Вы хотите оставить отзыв?")
          if (confirm === true) {
            const comment = prompt("Введите отзыв:", undefined)
            const idFeedbach = prompt("Введите id отзыва:", undefined)
            await Contract.methods.leaveComment(comment, idFeedbach).send({from: address})
            alert("Отзыв оставлен!")
          }
        } else alert("Магазины не могут отвечать не на свои отзывы!")
      } else alert("На отзывы может ответить только админ!")
    } catch (e) {
      alert(e)
    }
  }

  // Функция получения отзыва
  const GetFeedback = async () => {
    const listMap = await Contract.methods.get_complaintBooks_adrShop("Beer").call()
    setlistItems(listMap.map((element, id) => 
      <div key={id} className="borderList">
        <p>ID Отзывы №{id} от пользователя {element.user} </p>
        <p>Магазин: {element.shop}</p>
        <p>Отзыв: {element.feedback} </p>
        <p>Рейтинг: {element.rating}</p>
        <p>комментарии: {element.comment}</p>
        <p>Статус: {element.status ? "Открыт" : "Закрыт"}</p>
      </div>
      )
    )
  }

  // Получение отзыва
  useEffect(() => {
    GetFeedback()
  }, [])

  // HTML Code
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
          <Link style={{textDecoration: 'none', color: 'white'}} to="/Home"><button>Выйти</button></Link>
        </div>
      </div>
    </>
  )
}

export default Beer