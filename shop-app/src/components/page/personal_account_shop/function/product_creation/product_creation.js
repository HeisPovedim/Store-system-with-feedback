import React, { useEffect, useState } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from 'react-router-dom'
import "./product_creation.css"

const Return = () => {
  const { Contract } = UseContext();
  const [nameProduct, setNameProduct] = useState();
  const [descriptionProduct, setDescriptionProduct] = useState();
  const [priceProduct, setPriceProduct] = useState("");

  const address = localStorage.getItem('address');

  const creatProduct = async (e) => {
    try {
      alert('Вы создаете продукт...');
      await Contract.methods.addProductShop(nameProduct, priceProduct, descriptionProduct).send({from:address});
      console.log(nameProduct);
      console.log(descriptionProduct);
      console.log(priceProduct*(10**18));
      alert('Вы создали новый продукт: ' + nameProduct);
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
      <header className="header-creation-seller">
        <div className="header-creation-seller__text-header">Создание товара</div>
      </header>
      <div className="container-creation-seller">
        <div className="container-creation-seller-border-menu">
          <div className="container-creation-seller-border-menu__top-line"></div>
          <input onChange={ (e) => setNameProduct(e.target.value) } className="container-creation-seller-border-menu__input-name" type="text" placeholder="название"/>
          <input onChange={ (e) => setDescriptionProduct(e.target.value) } className="container-creation-seller-border-menu__input-description" type="text" placeholder="описание"/>
          <input onChange={ (e) => setPriceProduct(e.target.value) } className="container-creation-seller-border-menu__input-price" type="text" placeholder="цена"/>
          <div className="container-creation-seller-border-menu-buttons">
            <button onClick={creatProduct} className="container-creation-seller-border-menu-buttons__accept">
              <p>Создать</p>
            </button>
            <Link to="/PersonalAccountShop"><button className="container-creation-seller-border-menu__exit-button">
            <p>Выйти</p>
          </button></Link>
          </div>
          <div className="container-creation-seller-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Return;