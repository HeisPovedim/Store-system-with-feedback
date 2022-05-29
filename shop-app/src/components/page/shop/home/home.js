/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { UseContext } from '../../../contract/context'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './home.css'

const Home = () => {
  // Stat'ы && Context'ы
  const history = useHistory()
  const {Contract} = UseContext()
  const [ratingBeer, setRatingBeer] = useState(0)
  const [ratingProduct, setRatingProduct] = useState(0)

  // Перменные из localStorage
  const role = localStorage.getItem("role")
  const login = localStorage.getItem("login")
  const address = localStorage.getItem("address")

  // Функция получения рейтинга
  const GetRating = async () => {
    setRatingBeer(await Contract.methods.get_story_rating("Beer").call())
    setRatingProduct(await Contract.methods.get_story_rating("Product").call())
  }

  // Хук эффект рейтинга
  useEffect(() => {
    GetRating()
  },[])

  // Функция входа в магазин BEER
  const SignInBeerShop = async () => {
    let arrayProduct = await Contract.methods.get_product_list("Beer").call()
    for(let i of arrayProduct) {
      await Contract.methods.product_price_update(i, "Beer").send({from: '0x5271A094D799F7a4eB135951D7005a60Ac8bD7a8'})
    }
    history.push("/BeerBuy")
  }
  // Функция входа в магазин PRODCUT
  const SignInProductShop = async () => {
    let arrayProduct = await Contract.methods.get_product_list("Product").call()
    for(let i of arrayProduct) {
      await Contract.methods.product_price_update(i, "Product").send({from: '0x5271A094D799F7a4eB135951D7005a60Ac8bD7a8'})
    }
    history.push("/ProductBuy")
  }

  // Функция входа в личный кабинет
  const PersonalAccountSign = async (e) => {
    try {
      if (role === "2") {
        history.push("/PersonalAccountUser")
      } else if (role === "3") {
        history.push("/PersonalAccountShop")
      } else if (role === "1") {
        alert("У гостя нет личного кабинета!")
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Функция выхода из аккаунта
  const LoggedOut = async (e) => {
    try {
      const roleUser = await Contract.methods.get_role_user(login).call()
      console.log("roleUser:", roleUser)
      const roleShop = await Contract.methods.get_role_shop(login).call()
      console.log("roleShop:",roleShop)
      if(roleUser === "2") {
        alert("Вы вышли с аккаунта!")
        await Contract.methods.login_out_user(login).send({from:address})
      } else if (roleShop === "3") {
        alert("Вы вышли с аккаунта!")
        await Contract.methods.login_out_shop(login).send({from:address})
      }
    } catch (e) {
      alert(e)
    }
  }

  //HTML Code
  return(
    <>
      <div className="container-home">
        <header className="header-home">
          <div className="header-home_text-header">Меню</div>
          <div className="header-home_personal-info">
            <div className="header-home_personal-info_name">{login}</div>
            <div className="header-home_personal-info_link" onClick={PersonalAccountSign}>Личный кабинет</div>
          </div>
        </header>
        <div className="menu-home">
          <div className="menu-home__border-one">
            <p>Рейтинг: {ratingBeer}</p>
            <button onClick={SignInBeerShop}>Beer</button>
            <Link to="/BeerFeedback"><button>Отзывы</button></Link>
          </div>
          <div className="menu-home__border-two">
            <p>Рейтинг: {ratingProduct}</p>
            <button onClick={SignInProductShop}>Product</button>
            <Link to="/ProductFeedback"><button>Отзывы</button></Link>
          </div>
        </div>
        <footer className="footer-home">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/Login">
              <button onClick={LoggedOut}>Выйти</button>
            </Link>
        </footer>
      </div>
    </>
  )
}
export default Home