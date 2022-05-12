import React, {useEffect, useState} from "react";
import { UseContext } from "../../../contract/context";
import { Link } from "react-router-dom";
import "./personal_account.css"

const Seller = () => {
  const { Contract } = UseContext();
  const [balance, setBalance] = useState();
  const login = localStorage.getItem('login');
  const address = localStorage.getItem('address');

  //Хук эффект
  useEffect(() => {
    async function fetchData() {
      const getBalance = await Contract.methods.get_balance(address).call();
      setBalance(getBalance);
    }
    fetchData();
  },)

    return (
      <>
        <header className="header-page-user">
          <div className="header-page-user_text-header">Личный кабинет</div>
        </header>
        <div className="container-page-user">
          <div className="container-page-user-personal-information">
            <div className="container-page-user-personal-information__text-top">Личная информация:</div>
            <div className="container-page-user-personal-information__text-name">Имя: {login}</div>
            <div className="container-page-user-personal-information__text-login">Баланс: {(balance/10**18).toFixed(2)} eth</div>
          </div>
          <div className="container-page-user-function-menu">
            <div className="container-page-user-function-menu__text-top">Функции продовца</div>
            <Link to="/RefusalToPurchaseUser"><button className="container-page-user-function-menu__button-one">Отказ от пукупки</button></Link>
            <Link to="/ReturnOfGoodsUser"><button className="container-page-user-function-menu__button-two">Возврат товара</button></Link>
            <Link to="/MarriageRegistration"><button className="container-page-user-function-menu__button-three">Оформление брака</button></Link>
            <Link to="/LeaveFeedback"><button className="container-page-user-function-menu__button-three">Оставить отзыв</button></Link>
          </div>
        </div>
        <footer className="footer-page-user">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/Home">
            <button>Выйти</button>
          </Link>
        </footer>
      </>
    );
};

export default Seller;