import React, { useEffect, useState } from 'react'
import { UseContext } from '../../contract/context'
import { Link } from 'react-router-dom'
import './personal_account.css'

const Seller = () => {
  // Stat'ы && Context'ы
  const { Contract } = UseContext()
  const [balance, setBalance] = useState()
  const [countComments, setCountComments] = useState()
  const [rating, setRating] = useState()

  // Перменные из localStorage
  const login = localStorage.getItem('login')
  const address = localStorage.getItem('address')
  const role = localStorage.getItem("role")
  const city = localStorage.getItem("city")
  const shopNumber = localStorage.getItem("shopNumber")

  // Функция получение баланса
  const getBalance = async () => {
    const getBalance = await Contract.methods.get_balance(address).call()
    setBalance(getBalance)
  }
  // Функция получения кол-ва отзывов
  const getComments = async () => {
    const countComments = await Contract.methods.get_complaintBooks(login).call()
    setCountComments(countComments)
  }

  // Функция получения рейтинга магазина
  const getRating = async () => {
    const getRating = await Contract.methods.get_story_rating("Product").call()
    setRating(getRating)
  }

  // Хук эффект для использвания функций: баланса, кол-ва отзывов, ретинга
    useEffect(() => {
      getBalance()
      getComments()
      getRating()
    },)

  // Функция создания продукта
  const СreatProduct = async (e) => {
    try {
      const result = window.confirm("Создать товар?")
      if (result === true) {
        const title = prompt("Название товара:", undefined)
        const price = prompt("Цена товара:", undefined)
        const description = prompt("Описание товара:", undefined)
        await Contract.methods.addProductShop(title, price, description).send({ from: address })
        console.log(title)
        console.log(description)
        console.log(price * (10 ** 18))
        alert('Вы создали новый продукт: ' + title)
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  // Функция подтверждения или отклонения запроса покупателя на покупку товара
  const Сonfirmation = async () => {
    try {
      let result = window.confirm("Подтвердить или отклонить запрос покупателя на покупку товара?")
      if (result === true) {
        result = window.confirm(`Принять или отклонить?`)
        if (result === true) {
          const idPurchase = prompt("Введите id покупки:", undefined)
          console.log("purchase:", idPurchase)
          await Contract.methods.acceptPurchase(idPurchase, true).send({ from: address })
          alert('Подтверждение выполнено!')
        } else if (result === false) {
          const idPurchase = prompt("Введите id покупки:", undefined)
          console.log("purchase:", idPurchase)
          await Contract.methods.acceptPurchase(idPurchase, false).send({ from: address })
          alert('Отклонение выполнено!')
        }
      }
    } catch (e) {
      alert(e)
    }
  }

  // Функция подтверждения или отклонения запроса покупателя на возврат товара
  const Return = async () => {
    try {
      let result = window.confirm("Подтвердить или отклонить запрос покупателя на возврат товара?")
      if (result === true) {
        result = window.confirm(`Принять или отклонить?`)
        if (result === true) {
          const idReturn = prompt("Введите id возврата:", undefined)
          const structStatusReturn = await Contract.methods.structStatusReturns(idReturn).call()
          const structProduct = await Contract.methods.structProducts(structStatusReturn[1]).call()
          console.log("id возврата:", idReturn)
          await Contract.methods.acceptReturn(idReturn, true).send({ from:address, value:structProduct[2]})
          alert('Подтверждение выполнено!')
        } else if (result === false) {
          const idReturn = prompt("Введите id возврата:", undefined)
          const structStatusReturn = await Contract.methods.structStatusReturn(idReturn).call()
          const structProduct = await Contract.methods.structProduct(structStatusReturn[1]).call()
          console.log("id возврата:", idReturn)
          await Contract.methods.acceptReturn(idReturn, false).send({ from:address, value:structProduct[2]})
          alert('Отклонение выполнено!')
        }
      }
    } catch (e) {
      alert(e)
    }
  }

  // Функция подтверждения или отклонения запроса покупателя на оформление брака
  const Marriage = async () => {
    try {
      let result = window.confirm("Подтвердить или отклонить запрос покупателя на оформление брака?")
      if (result === true) {
        result = window.confirm(`Принять или отклонить?`)
        if (result === true) {
          const idMarriage = prompt("Введите id брака:", undefined)
          const structStatusMarriages = await Contract.methods.structStatusMarriages(idMarriage).call()
          const structProduct = await Contract.methods.structProducts(structStatusMarriages[1]).call()
          console.log("id брака:", idMarriage)
          await Contract.methods.acceptMarriage(idMarriage, true).send({ from:address, value:structProduct[2]} )
          alert('Подтверждение выполнено!')
        } else if (result === false) {
          const idMarriage = prompt("Введите id брака:", undefined)
          const structStatusReturn = await Contract.methods.structStatusReturn(idMarriage).call()
          const structProduct = await Contract.methods.structProduct(structStatusReturn[1]).call()
          console.log("id брака:", idMarriage)
          await Contract.methods.acceptMarriage(idMarriage, false).send({ from:address, value:structProduct[2]} )
          alert('Отклонение выполнено!')
        }
      }
    } catch (e) {
      alert(e)
    }
  }

  // Функция оформления коментария к отзыву
  const Comment = async () => {
    try {
      const result = window.confirm("Оставить комментарий?")
      if (result === true) {
        const leaveComment = prompt("Введите комментарий:", undefined)
        const idFeedbach = prompt("Введите id отзыва:", undefined)
        await Contract.methods.leaveComment(leaveComment, idFeedbach).send({ from: address })
        alert("Комментарий оформлен.")
      }
    } catch (e) {
      alert(e)
    }
  }

  // HTML Code
  return (
    <>
      <header className="header-page-seller">
        <div className="header-page-seller_text-header">Личный кабинет</div>
        <div className="header-page-seller_text-role">Роль: {role === "3" ? "Магазин" : undefined}</div>
      </header>
      <div className="container-page-seller">
        <div className="container-page-seller__personal-information">
          <div className="container-page-seller__personal-information_text-title">Личная информация:</div>
          <div className="container-page-seller__personal-information_text-base">Имя: {login}</div>
          <div className="container-page-seller__personal-information_text-base">Баланс: {(balance/10**18).toFixed(4)} eth</div>
          <div className="container-page-seller__personal-information_text-base">Город: {city}</div>
          <div className="container-page-seller__personal-information_text-base">Номер: {shopNumber}</div>
          <div className="container-page-seller__personal-information_text-base">Кол-во отзывов: {countComments}</div>
          <div className="container-page-seller__personal-information_text-base">Рейтинг магазина: {rating}</div>
        </div>
        <div className="container-page-seller__function-menu">
          <div className="container-page-seller__function-menu_text-top">Функции продовца</div>
          <button onClick={ СreatProduct } className="container-page-seller__function-menu_button-one">Создание товара</button>
          <button onClick={ Сonfirmation } className="container-page-seller__function-menu_button-two">Подтверждение или отклонение запроса покупателя на покупку</button>
          <button onClick={ Return } className="container-page-seller__function-menu_button-three">Подтверждение или отклонение запроса покупателя на возврат товара</button>
          <button onClick={ Marriage } className="container-page-seller__function-menu_button-four">Подтверждение или отклонение запроса покупателя на оформление брака</button>
          <button onClick={ Comment } className="container-page-seller__function-menu_button-one">Оставить комментарий</button>
        </div>
      </div>
      <footer className="footer-page-seller">
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/Home">
          <button>Выйти</button>
        </Link>
      </footer>
    </>
  )
}

export default Seller