import React from "react";
import "./home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return(
    <>
    <div className="container">
      <header className="header">
        <div></div>
        <div className="header__text-header">Ассортимент</div>
        <div className="header__personal-info">
          <div className="header__personal-info_name">name</div>
          <Link className="header__personal-info_link">Личный кабинет</Link>
        </div>
      </header>
      <div className="container__menu">
        <div className="menu">
          <div className="menu__one-border" >1</div>
          <div className="menu__two-border">2</div>
          <div className="menu__three-border">3</div>
          <div className="menu__four-border">4</div>
        </div>
      </div>
      <div className="container__but-info">
        <div>but</div>
      </div>
    </div>
    </>
  );
};

export default Home;