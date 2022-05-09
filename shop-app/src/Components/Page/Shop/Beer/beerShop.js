import React, {useEffect, useState} from "react";
import { UseContext } from "../../../contract/context";
// import { useHistory } from "react-router-dom";
// import Web3 from "web3";
import { Link } from 'react-router-dom'
import "./beerShop.css"

const Beer = () => {
  const { Contract } = UseContext();
  const [arrayProduct, setArrayProduct] = useState([]);
  const [product, setProduct] = useState(0);
  const [price, setPrice] = useState(0);

  //Переменные из localStorage
  const address = localStorage.getItem("address")

  //Получение списка продуктов
  useEffect(() => {
    const ListarrayProduct = async() => {
      let arrayProduct = await Contract.methods.get_product_list().call();
      setArrayProduct(arrayProduct);
      setProduct(arrayProduct[0]);
    }
    ListarrayProduct();
  }, [])

  useEffect(() => {
    async function temp() {
      var structProduct = await Contract.methods.structProducts(product).call();
      setPrice(structProduct[2]);
    }
    temp();
    console.log(product);
  })


  //Фунция создания продукта
  const BuyProduct = async (e) => {
    try {
      await Contract.methods.productPurchases(product).send({from:address, value:price});
      console.log("product:", product);
      console.log("address:", address);
      console.log("price", price);
      alert("Вы купили продукт!");
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
    <div className="container-page-beer">
      <header className="container-page-beer__header-shop-beer">
        <div className="container-page-beer__header-shop-beer_text-header">Ассортимент</div>
        <div className="container-page-beer__header-shop-beer_personal-info">
        </div>
      </header>
      <div className="container-page-beer__menu">
        <div className="menu__logo-beer"></div>
        <div className="menu">
          <button onClick={BuyProduct} className="menu__buy-button">КУПИТЬ</button>
          <select onChange={ (e) => setProduct(e.target.value) } className="menu__products-select">
            {arrayProduct.map((arr,i) => <option key={i} value={String(arr)}> { arr } </option>)}
          </select>
          <p> {price/(10**18)} </p>
        </div>
      </div>
      <div className="container-page-beer__but-info">
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/Home">
          <button>Выйти</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Beer;