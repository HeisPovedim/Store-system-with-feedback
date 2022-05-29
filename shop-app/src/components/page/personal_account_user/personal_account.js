import React, { useEffect, useState } from 'react'
import { UseContext } from '../../contract/context'
import { Link } from 'react-router-dom'
import './personal_account.css'

const Seller = () => {
  // Stat'ы && Context'ы
  const { Contract } = UseContext()
  const [balance, setBalance] = useState()

  // Переменные из localStorage
  const login = localStorage.getItem('login')
  const address = localStorage.getItem('address')
  const role = localStorage.getItem("role")

  // Хук эффект
  useEffect(() => {
    async function fetchData() {
      const getBalance = await Contract.methods.get_balance(address).call()
      setBalance(getBalance)
    }
    fetchData()
  })

  // Функция отказа от пукупки
  const Refusal = async (e) => {
    try {
      const result = window.confirm("Отказаться от покупки?")
      if (result === true) {
        const purchase = prompt("Id Покупки:", undefined)
        await Contract.methods.refusalToPurchase(purchase).send({ from: address })
        alert("Вы отказались от покупки, под id: " + purchase)
      }
    } catch (e) {
      alert(e)
    }
  }

  // Функция возвтара товара
  const Return = async (e) => {
    try {
      const result = window.confirm("Оформить возврат товара?")
      if (result === true) {
        let shopList = await Contract.methods.get_shop_list().call()
        alert(shopList)
        const shopName = prompt("Введите название магазина:", undefined)
        let shopAdr = await Contract.methods.get_address(shopName).call()
        const productReturn = prompt("Введите название продукта:", undefined)
        let structProducts = await Contract.methods.structProducts(productReturn).call()
        if (shopAdr === structProducts[0]) {
          console.log("Название продукта: " + productReturn)
          await Contract.methods.productReturn(productReturn).send({ from: address })
          alert("Вы оформили возврат!")
        } else {
          alert("Такого продукта нет!")
        }
      }
    } catch (e) {
      alert(e)
    }
  }

  // Функция оформления брака
  const Marriage = async (e) => {
    try {
      const result = window.confirm("Оформить брак товара?")
      if (result === true) {
        let shopList = await Contract.methods.get_shop_list().call()
        alert(shopList)
        const shopName = prompt("Введите название магазина:", undefined)
        let shopAdr = await Contract.methods.get_address(shopName).call()
        const productMarriage = prompt("Введите название продукта:", undefined)
        let structProducts = await Contract.methods.structProducts(productMarriage).call()
        if (shopAdr === structProducts[0]) {
          await Contract.methods.productMarriage(productMarriage).send({ from: address })
          alert("Вы оформили брак!")
        } else {
          alert("Такого продукта нет!")
        }
      }
    } catch (e) {
      alert(e)
    }
  }

  // Функция оформления отзыва
  const Feedback = async (e) => {
    try {
      const result = window.confirm("Оставить отзыв?")
      if (result === true) {
        let shopList = await Contract.methods.get_shop_list().call()
        alert(shopList)
        const shopName = prompt("Введите название магазина:", undefined)
        const feedback = prompt("Введите свой отзыв:", undefined)
        const rating = prompt("Введите рейтинг магазина от 1-го до 10-ти:", undefined)
        await Contract.methods.leaveFeedback(shopName, feedback, rating).send({ from: address })
        alert("Вы оставили отзыва!")
      }
    } catch (e) {
      alert(e)
    }
  }

  //HTML Code
  return (
    <>
      <div className="body-page-user">
        <header className="header-page-user">
          <div className="header-page-user_text-header">Личный кабинет</div>
          <div className="header-page-seller_text-role">Роль: {role === "2" ? "Пользователь" : undefined}</div>
        </header>
        <div className="container-page-user">
          <div className="container-page-user-personal-information">
            <div className="container-page-user-personal-information__text-top">Личная информация:</div>
            <div className="container-page-user-personal-information__text-name">Имя: {login}</div>
            <div className="container-page-user-personal-information__text-login">Баланс: {(balance/10**18).toFixed(2)} eth</div>
          </div>
          <div className="container-page-user-function-menu">
            <div className="container-page-user-function-menu__text-top">Функции пользователя:</div>
            <button onClick={Refusal} className="container-page-user-function-menu__button-one">Отказ от пукупки</button>
            <button onClick={Return} className="container-page-user-function-menu__button-two">Возврат товара</button>
            <button onClick={Marriage} className="container-page-user-function-menu__button-three">Оформление брака</button>
            <button onClick={Feedback} className="container-page-user-function-menu__button-three">Оставить отзыв</button>
          </div>
        </div>
        <footer className="footer-page-user">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/Home">
            <button>Выйти</button>
          </Link>
        </footer>
      </div>
    </>
  )
}

export default Seller