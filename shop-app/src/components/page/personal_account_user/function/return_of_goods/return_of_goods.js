import React, { useState, useEffect } from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from "react-router-dom";
import "./return_of_goods.css"

const Confirmation = () => {
  //Stat'ы
  const { Contract } = UseContext();
  const [arrayProduct, setArrayProduct] = useState([]);
  const [adrShop, setAdrShop] = useState(0);
  const [productReturn, setProductReturn] = useState("");

  //Переменные из localStorage
  const address = localStorage.getItem("address")

  //UseEffect - адресов
  useEffect(() => {
    const ListarrayProduct = async() => {
      let arrayProduct = await Contract.methods.get_shop_list().call();
      setArrayProduct(arrayProduct);
      setAdrShop(arrayProduct[0]);
    }
    ListarrayProduct();
  })

  //Функция оформления ВОЗВРАТА
  const ProductReturn = async (e) => {
    try {
      alert("Происходит оформление возврата...");
      let structProducts = await Contract.methods.structProducts(productReturn).call();
      let structAdrShop = await Contract.methods.get_address(adrShop).call();
      if (structAdrShop === structProducts[0]) {
        console.log("Название продукта: " + productReturn);
        await Contract.methods.productReturn(productReturn).send({ from: address });
        alert("Вы оформили возврат!");
      } else {
        alert("Такого продукта нет!");
      }
    } catch (e) {
      alert(e);
    }
  }

  return(
    <>
      <header className="header-return-user">
        <div className="header-return-user__text-header">Возврат товара</div>
      </header>
      <div className="container-return-user">
        <div className="container-return-user-border-menu">
          <div className="container-return-user-border-menu__top-line"></div>
          <select onChange={ (e) => setAdrShop(e.target.value) } className="menu__products-select" style={{ fontSize: '18px'}}>
            {arrayProduct.map((arr,i) => <option key={i} value={String(arr)}> { arr } </option>)}
          </select>
          <input onChange={ (e) => setProductReturn(e.target.value) } className="container-return-user-border-menu__input-id" type="text" placeholder="название продукта"/>
          <div className="container-return-user-border-menu-buttons">
            <button onClick={ ProductReturn } className="container-return-user-border-menu-buttons__accept">Подтвердить</button>
            <Link to="/PersonalAccountUser"><button className="container-return-user-border-menu-buttons__exit-button">Выйти</button></Link>
          </div>
          <div className="container-return-user-border-menu__bottom-line"></div>
        </div>
      </div>
    </>
  )
}

export default Confirmation;