import React, { useEffect, useState } from "react";
import { UseContext } from "../../../contract/context";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./home.css";

const Home = () => {
  //Stat'ы
  const history = useHistory();
  const { Contract } = UseContext();
  const [ ratingBeer, setRatingBeer ] = useState(0);
  const [ ratingProduct, setRatingProduct ] = useState(0);

  //Перменные из localStorage
  const role = localStorage.getItem("role");
  const login = localStorage.getItem("login");
  const address = localStorage.getItem("address")

  //Хук эффект
  useEffect(() => {
    const GetRating = async () => {
      setRatingBeer(await Contract.methods.get_story_rating("Beer").call());
      setRatingProduct(await Contract.methods.get_story_rating("Product").call());
    }
    GetRating();
  },[])

  const PersonalAccountSign = async (e) => {
    try {
      if (role === "2") {
        history.push("/PersonalAccountUser");
      } else if (role === "3") {
        history.push("/PersonalAccountShop");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const LoggedOut = async (e) => {
    try {
      const roleUser = await Contract.methods.get_role_user(login).call();
      console.log("roleUser:", roleUser);
      const roleShop = await Contract.methods.get_role_shop(login).call();
      console.log("roleShop",roleShop);
      if(roleUser === "2") {
        alert("Вы вышли с аккаунта!");
        await Contract.methods.login_out_user(login).send({from:address});
      } else if (roleShop === "3") {
        alert("Вы вышли с аккаунта!");
        await Contract.methods.login_out_shop(login).send({from:address});
      }
    } catch (e) {
      console.log(e);
    }
  }

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
            <Link to="/BeerBuy"><button>Beer</button></Link>
            <Link to="/BeerFeedback"><button>Отзывы</button></Link>
          </div>
          <div className="menu-home__border-two">
            <p>Рейтинг: {ratingProduct}</p>
            <Link to="/ProductBuy"><button>Product</button></Link>
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
export default Home;