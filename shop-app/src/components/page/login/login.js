import React, { useState } from "react";
import { UseContext } from "../../contract/context";
import {useHistory} from "react-router-dom";
import './login.css';

const Login = () => {
  const {web3, Contract} = UseContext();
  const [login, setLogin] = useState("Guest");
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState(0x0000000000000000000000000000000000000000);
  const [shopNumber, setShopNumber] = useState();
  const history = useHistory();

  localStorage.setItem("login", login);
  localStorage.setItem("role", role);
  localStorage.setItem("city", city);
  localStorage.setItem("address", address);
  localStorage.setItem("shopNumber", shopNumber);

  const LogIn = async (e) => {
    try {
      alert("Выполняется вход...");
      e.preventDefault();
      const address = await Contract.methods.get_address(login).call();
      setAddress(address);
      console.log("Address: ", address);
      await web3.eth.personal.unlockAccount(address, password, 0);
      const protectPassword = await web3.utils.keccak256(password);
      const roleUser = await Contract.methods.get_role_user(login).call();
      const roleShop = await Contract.methods.get_role_shop(login).call();
      if(roleUser === "2") {
        await Contract.methods.login_user(login, protectPassword).send({from:address});
        const onlineUser = await Contract.methods.check_logged_user(login).call();
        console.log("onlineUser: " + onlineUser);
        localStorage.setItem("address", address);
        var AddrInfoUser = await Contract.methods.structUsers(address).call();
        setRole(AddrInfoUser[2])
        console.log("Role: ", AddrInfoUser[2]);
        alert("Вы авторизовались!");
        if(onlineUser){
          web3.eth.defaultAccount = address;
          history.push("/Home");
        }
      } else if (roleShop === "3") {
        await Contract.methods.login_shop(login, protectPassword).send({from:address});
        const onlineShop = await Contract.methods.check_logged_shop(login).call();
        console.log("onlineShop: " + onlineShop);
        var AddrInfoShop = await Contract.methods.structShops(address).call();
        setRole(AddrInfoShop[2]);
        console.log("Role: ", AddrInfoShop[2]);
        setCity(AddrInfoShop[5]);
        console.log("City: ", AddrInfoShop[5]);
        setShopNumber(AddrInfoShop[4]);
        console.log("Number: ", AddrInfoShop[4]);
        alert("Вы авторизовались!");
        if(onlineShop){
          web3.eth.defaultAccount = address;
          history.push("/Home");
        };
      };
    }catch(e) {
      alert(e);
    };
  };

  const Registration = async (e) => {
    try
    {
      alert("Выполняется регистрация...");
      e.preventDefault()
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await web3.eth.personal.unlockAccount(accounts[0], "1", 0);
      const tempAdr = await Contract.methods.get_address(login).call();
      if(tempAdr === '0x0000000000000000000000000000000000000000') {
        const address = await web3.eth.personal.newAccount(password);
        await web3.eth.personal.unlockAccount(address, password,0);
        const protectPassword = await web3.utils.keccak256(password);
        for(let i = 0; i < 2; i++){
          await web3.eth.sendTransaction({
            from: accounts[0],
            to: address,
            value: Number(500000000000000000000n)
          });
        }
        await Contract.methods.create_user(address, login, protectPassword).send({from:accounts[0]});
        alert("Аккаунт создан, ваш адрес:\n" + address);
      } else {
        alert("Логин занят!");
      }
    } catch(e) {
      alert(e);
    };
  };

  const Guest = async (e) => {
    try {
      history.push("/Home");
      alert("Вы вошли как гость!")
    } catch (e) {
      alert(e);
    }
  }

  return(
    <>
      <div className="border-login">
        <div className="border-login__line-top"></div>
        <div className="border-login__text">Вход</div>
          <input onChange={(e) => setLogin(e.target.value)} type="text" placeholder="Логин"/>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль"/>
          <button className="border-login__button-login" onClick={LogIn}>Войти</button>
          <button className="border-login__button-signIn" onClick={Registration}>Зарегестрироваться</button>
          <button className="border-login__button-view" onClick={Guest}>Просмотр содержимого</button>
        <div className="border-login__line-button"></div>
      </div>
    </>
  );
};

export default Login;