import React, { useState } from "react";
import { UseContext } from "../../../../Contract/context";
import { Link } from 'react-router-dom'
import "./product_creation.css"

const Return = () => {
  const { Contract } = UseContext();
  const [nameProduct, setNameProduct] = useState();
  const [descriptionProduct, setDescriptionProduct] = useState();
  const [priceProduct, setPriceProduct] = useState();

  const address = localStorage.getItem('address');

  const hadleNameProduct = (e) => {
    setNameProduct(e.target.value);
  }
  const hadleDescriptionProduct = (e) => {
    setDescriptionProduct(e.target.value);
  }
  const hadlePriceProduct = (e) => {
    setPriceProduct(e.target.value);
  }

  const creatProduct = async (e) => {
    try {
      await Contract.methods.addProductShop(nameProduct, priceProduct, descriptionProduct).send({from:address});
      console.log(nameProduct);
      console.log(descriptionProduct);
      console.log(priceProduct);
      alert('Вы создали новый продукт:', nameProduct);
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
      <header className="header-page-creation">
        <div className="header-page-creation_text-header">Создание товара</div>
      </header>
      <div className="container-page-creation">
        <div className="container-page-creation__border-menu">
          <div className="container-page-creation__border-menu_top-line"></div>
          <input onChange={hadleNameProduct} className="container-page-creation__border-menu_input-name" type="text" placeholder="название"/>
          <input onChange={hadleDescriptionProduct} className="container-page-creation__border-menu_input-description" type="text" placeholder="описание"/>
          <input onChange={hadlePriceProduct} className="container-page-creation__border-menu_input-price" type="text" placeholder="цена"/>
          <div className="container-page-creation__border-menu_buttons">
            <button onClick={creatProduct} className="container-page-creation__border-menu_buttons_accept">
              <p>Создать</p>
            </button>
            <Link to="/PersonalAccountShop"><button className="container-page-creation__border-menu_exit-button">
            <p>Выйти</p>
          </button></Link>
          </div>
          <div className="container-page-creation__border-menu_bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Return;