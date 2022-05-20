import React, {useEffect, useState} from "react";
import { UseContext } from "../../../../contract/context";
import { Link } from 'react-router-dom'
import "./beerShop.css"

const Beer = () => {
  const { Contract } = UseContext();
  const [arrayProduct, setArrayProduct] = useState([]);
  const [product, setProduct] = useState(0);
  const [price, setPrice] = useState(0);

  //Переменные из localStorage
  const address = localStorage.getItem("address");
  const role = localStorage.getItem("role");

  //Получение списка продуктов
  useEffect(() => {
    const ListArrayProduct = async () => {
      let arrayProduct = await Contract.methods.get_product_list("Beer").call();
      setArrayProduct(arrayProduct);
      setProduct(arrayProduct[0]);
    }
    async function GetProductPrice() {
      var structProduct = await Contract.methods.structProducts(product).call();
      setPrice(structProduct[2]);
    }
    const RefusalProductPrice = async () => {
      const ratingShop = await Contract.methods.get_story_rating("Beer").call();
      const structShop = await Contract.methods.structShops(address).call();
      const structShopProducts = [structShop[7]];
      for (let i = 0; i < structShopProducts.length; i++) {
        const structProduct = await Contract.methods.structProduct(structShopProducts[i]).call();
        if (ratingShop < 2) {
          structProduct[2] = structProduct[2] - ((50 * 100) / 100);
          // priceProduct -= ((50*100)/100);
        } else if (ratingShop > 2 && ratingShop < 4) {
          structProduct[2] = structProduct[2] - ((20 * 100) / 100);
          // priceProduct -= ((20*100)/100);
        } else if(ratingShop > 4 && ratingShop < 6) {
  
        } else if (ratingShop > 6 && ratingShop < 8) {
          structProduct[2] = structProduct[2] + ((20 * 100) / 100);
          // priceProduct += ((20*100)/100);
        } else if (ratingShop > 8) {
          structProduct[2] = structProduct[2] + ((50 * 100) / 100);
          // priceProduct += ((50*100)/100);
        }
      }
    }
    console.log(product);
    RefusalProductPrice();
    GetProductPrice();
    ListArrayProduct();
  }, [])


  //Фунция покупки продукта
  const BuyProduct = async (e) => {
    try {
        if (role === "2") {
          alert("Происходит покупки продукта...")
          await Contract.methods.productPurchases(product).send({from:address, value:price});
          console.log("product:", product);
          console.log("address:", address);
          console.log("price", price);
          alert("Вы купили продукт!");
        } else if (role === "3") {
          alert("Магазин не может оформлять покупку твора!")
        } else if (role === "1") {
          alert("Гости не могут оформлять покупку товара!");
        }

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
  );
};

export default Beer;