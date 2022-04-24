import React, { useState } from "react";
import { UseContext } from "../../contract/context";
import {useHistory} from "react-router-dom";
import './login.css';

const Login = () => {
  const { web3, Contract } = UseContext();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [balance, setBalance] = useState();
  const [role, setRole] = useState();
  const [city, setCity] = useState('');
  const [address, setAddress] = useState();
  const [shopNumber, setShopNumber] = useState();

  localStorage.setItem("login", login);
  localStorage.setItem("balance", balance);
  localStorage.setItem("role", role);
  localStorage.setItem("city", city);
  localStorage.setItem("address", address);
  localStorage.setItem("shopNumber", shopNumber);

  const hadlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = (e) => {
    setLogin(e.target.value)
  }

  const LogIn = async (e) => {
    try{
      e.preventDefault()
      const address = await Contract.methods.get_address(login).call();
      setAddress(address);
      console.log("get_address", address);
      await web3.eth.personal.unlockAccount(address, password, 0);
      const protectPassword = await web3.utils.keccak256(password);
      const roleUser = await Contract.methods.get_role_user(login).call();
      console.log("roleUser:", roleUser);
      const roleShop = await Contract.methods.get_role_shop(login).call();
      console.log("roleShop:",roleShop);
      if(roleUser === "2") {
        await Contract.methods.login_user(login, protectPassword).send({from:address});
        const onlineUser = await Contract.methods.check_logged_user(login).call();
        console.log(onlineUser)
        localStorage.setItem("address", address);
        var AddrInfoUser = await Contract.methods.structUsers(address).call();
        console.log(AddrInfoUser);
        setBalance(AddrInfoUser[2])
        console.log("Balance:", AddrInfoUser[2]);
        setRole(AddrInfoUser[3])
        alert("Вы авторизовались!");
        if(onlineUser){
          web3.eth.defaultAccount = address;
          history.push("/Home");
        }
      } else if (roleShop === "3") {
        await Contract.methods.login_shop(login, protectPassword).send({from:address});
        const onlineShop = await Contract.methods.check_logged_shop(login).call();
        console.log(onlineShop);
        var AddrInfoShop = await Contract.methods.structShops(address).call();
        console.log(AddrInfoShop);
        setBalance(AddrInfoShop[2]);
        console.log("Balance:", AddrInfoShop[2]);
        setRole(AddrInfoShop[3]);
        setCity(AddrInfoShop[6])
        console.log("City:", AddrInfoShop[6]);
        setShopNumber(AddrInfoShop[5]);
        console.log(AddrInfoShop[5]);
        alert("Вы авторизовались!");
        if(onlineShop){
          web3.eth.defaultAccount = address;
          history.push("/Home");
        };
      };
    }catch(e) {
      console.log(e);
    };
  };
;
  const Registration = async (e) => {
    try
    {
      e.preventDefault()
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await web3.eth.personal.unlockAccount(accounts[0],"1",0);
      const address = await web3.eth.personal.newAccount(password);
      alert("Ваш аккаунт создается, подождите..")
      await web3.eth.personal.unlockAccount(address, password,0);
      const protectPassword = await web3.utils.keccak256(password);
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: address,
        value: 10*(10 ** 18)
      });
      await Contract.methods.create_user(address, login, protectPassword).send({from:accounts[0]});
      alert("Аккаунт создан, ваш адрес:"+ address);
    } catch(e) {
      alert(e);
    }
  };

  return(
    <>
      <body className="border-login">
        <div className="border-login__line-top"></div>
        <div className="border-login__text">Вход</div>
          <input onChange={handleLogin} type="text" placeholder="Логин"/>
          <input onChange={hadlePassword} type="password" placeholder="Пароль"/>
          <button className="border-login__button-login" onClick={LogIn}>
            <p>Войти</p>
          </button>
          <button className="border-login__button-signIn" onClick={Registration}>
            <p>Зарегестрироваться</p>
          </button>
        <div className="border-login__line-button"></div>
      </body>
    </>
  );
};

export default Login;