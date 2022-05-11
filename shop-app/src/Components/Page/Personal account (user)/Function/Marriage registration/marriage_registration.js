import React, { useState, useEffect } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./marriage_registration.css"

const Confirmation = () => {
//BEGIN - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОДА
  //Stat'ы
  const { Contract } = UseContext();
  const [arrayProduct, setArrayProduct] = useState([]);
  const [adrShop, setAdrShop] = useState(0);
  const [productMarriage, setProductMarriage] = useState("");

  //Переменные из localStorage
  const address = localStorage.getItem("address");

//UseEffect - адресов
  useEffect(() => {
    const ListarrayProduct = async() => {
      let arrayProduct = await Contract.methods.get_shop_list().call();
      setArrayProduct(arrayProduct);
      setAdrShop(arrayProduct[0]);
    }
    ListarrayProduct();
  }, [])

  //Функция оформления БРАКА
  const ProductMarriage = async (e) => {
    try {
      alert("Происходит оформление возврата...");
      let structProducts = await Contract.methods.structProducts(productMarriage).call();
      let structAdrShop = await Contract.methods.get_address(adrShop).call();
      if (structAdrShop === structProducts[0]){
        console.log("Название продукта: " + productMarriage);
        await Contract.methods.productMarriage(productMarriage).send({ from: address });
        alert("Вы оформили возврат!");
      } else {
        alert("Такого продукта нет!");
      }
    } catch (e) {
      alert(e);
    }
  }
//END - ФУНКЦИОНАЛЬНАЯ ЧАСТЬ КОДА
//BEGIN - HTML КОД
  return(
    <>
      <header className="header-marriage-user">
        <div className="header-marriage-user__text-header">Оформление брака</div>
      </header>
      <div className="container-marriage-user">
        <div className="container-marriage-user-border-menu">
          <div className="container-marriage-user-border-menu__top-line"></div>
          <select onChange={ (e) => setAdrShop(e.target.value) } className="menu__products-select" style={{ fontSize: '18px'}}>
            {arrayProduct.map((arr,i) => <option key={i} value={String(arr)}> { arr } </option>)}
          </select>
          <input onChange={ (e) => setProductMarriage(e.target.value) } className="container-marriage-user-border-menu__input-id" type="text" placeholder="название продукта"/>
          <div className="container-marriage-user-border-menu-buttons">
            <button onClick={ ProductMarriage } className="container-marriage-user-border-menu-buttons__accept">Оформить</button>
            <Link to="/PersonalAccountUser"><button className="container-marriage-user-border-menu-buttons__exit-button">Выйти</button></Link>
          </div>
          <div className="container-marriage-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
//END - HTML КОД
}

export default Confirmation;