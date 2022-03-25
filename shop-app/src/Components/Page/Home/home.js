import React from "react";
import "./home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return(
    <>
      <header className="header">
        <div></div>
        <div className="header__text-header">Ассортимент</div>
        <div className="header__personal-info">
          <div className="header__personal-info_name">name</div>
          <Link className="header__personal-info_link">Личный кабинет</Link>
        </div>
      </header>
    </>
  );
};

export default Home;