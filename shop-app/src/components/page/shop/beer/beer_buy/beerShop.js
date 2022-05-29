import React, { useEffect, useState } from 'react'
import { UseContext } from '../../../../contract/context'
import { Link } from 'react-router-dom'
import png from '../../../../img/beerShop/logo_beer.png'
import './beerShop.css'

const Beer = () => {
  // Stat'ы && Context'ы
  const { Contract } = UseContext()
  const [arrayProduct, setArrayProduct] = useState([])
  const [product, setProduct] = useState(0)
  const [price, setPrice] = useState(0)

  // Переменные из localStorage
  const address = localStorage.getItem("address")
  const role = localStorage.getItem("role")

  // Получение списка продуктов
  useEffect(() => {
    const ListArrayProduct = async () => {
      let arrayProduct = await Contract.methods.get_product_list("Beer").call()
      setArrayProduct(arrayProduct)
      setProduct(arrayProduct[0])
    }
    ListArrayProduct()
  }, [Contract.methods])

  // Получени цены продкута
  useEffect(() => {
    const GetProductPrice = async () => {
      var structProduct = await Contract.methods.structProducts(product).call()
      setPrice(structProduct[2])
    }
    GetProductPrice()
  }, [Contract.methods, product])


  // Фунция покупки продукта
  const BuyProduct = async (e) => {
    try {
      if (role === "2") {
        alert("Происходит покупки продукта...")
        await Contract.methods.productPurchases(product).send({from:address, value:price})
        console.log("product:", product)
        console.log("address:", address)
        console.log("price", price)
        alert("Вы купили продукт!")
      } else if (role === "3") {
        alert("Магазин не может оформлять покупку твора!")
      } else if (role === "1") {
        alert("Гости не могут оформлять покупку товара!")
      }
    } catch (e) {
      alert(e)
    }
  }

  //HTML Code
  return(
    <>
      <div className="container-page-beer">
        <header className="container-page-beer__header-shop-beer">
          <div className="container-page-beer__header-shop-beer_text-header">Ассортимент</div>
          <div className="container-page-beer__header-shop-beer_personal-info">
          </div>
        </header>
        <div className="container-page-beer__menu">
          <img src={png} alt="logo" />
          <div className="menu">
            <button onClick={BuyProduct} className="menu__buy-button">КУПИТЬ</button>
            <select onChange={ (e) => setProduct(e.target.value) } className="menu__products-select">
              {arrayProduct.map((arr,i) => <option key={i} value={String(arr)}> { arr } </option>)}
            </select>
            <p> {price/(10**18)} eth </p>
          </div>
        </div>
        <div className="container-page-beer__but-info">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/Home">
            <button>Выйти</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Beer