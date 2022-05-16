import React, {useEffect, useState} from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from 'react-router-dom'
import "./productShop.css"

const Product = () => {
  const { Contract } = UseContext();
  const [arrayProduct, setArrayProduct] = useState([]);
  const [product, setProduct] = useState(0);
  const [price, setPrice] = useState(0);

  //Переменные из localStorage
  const address = localStorage.getItem("address");

  //Получение списка продуктов
  useEffect(() => {
    const ListArrayProduct = async () => {
      let arrayProduct = await Contract.methods.get_product_list("Product").call();
      setArrayProduct(arrayProduct);
      setProduct(arrayProduct[0]);
    }
    ListArrayProduct();
  })

  //Получение цены продкута
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
      await Contract.methods.productPurchases(product).send({ from:address, value:price });
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
    <div className="container-page-product">
      <header className="container-page-product__header-shop-product">
        <div className="container-page-product__header-shop-product_text-header">Ассортимент</div>
        <div className="container-page-product__header-shop-product_personal-info">
        </div>
      </header>
      <div className="container-page-product__menu">
        <div className="menu__logo-product"></div>
        <div className="menu">
          <button onClick={BuyProduct} className="menu__buy-button">КУПИТЬ</button>
          <select onChange={ (e) => setProduct(e.target.value) } className="menu__products-select">
            {arrayProduct.map((arr,i) => <option key={i} value={String(arr)}> { arr } </option>)}
          </select>
          <p> {price/(10**18)} eth </p>
        </div>
      </div>
      <div className="container-page-product__but-info">
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/Home">
          <button>Выйти</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Product;