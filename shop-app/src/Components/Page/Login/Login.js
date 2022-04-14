import React, { useState } from "react";
import { UseContext } from "../../Contract/context";
import {useHistory} from "react-router-dom";
import './login.css';

const Login = () => {
  const { web3, Contract } = UseContext();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [balance, setBalance] = useState();
  const [role, setRole] = useState();

  localStorage.setItem("login", login);
  localStorage.setItem("balance", balance);
  localStorage.setItem("role", role);

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
      console.log("get_address", address);
      await web3.eth.personal.unlockAccount(address, password,0);
      const protectPassword = await web3.utils.keccak256(password);
      const roleUser = await Contract.methods.get_role_user(login).call();
      console.log("roleUser:", roleUser);
      const roleShop = await Contract.methods.get_role_shop(login).call();
      console.log("roleShop",roleShop);

      if(roleUser === "2") {
        await Contract.methods.login_user(login, protectPassword).send({from:address});
        const onlineUser = await Contract.methods.check_logged_user(login).call();
        console.log(onlineUser)
        localStorage.setItem("address", address);
        var AddrInfoUser = await Contract.methods.structUsers(address).call();
        console.log(AddrInfoUser);
        setBalance(AddrInfoUser[2])
        console.log(balance);
        setRole(AddrInfoUser[3])
        console.log(role);
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
        console.log(balance);
        setRole(AddrInfoShop[3]);
        console.log(role);
        if(onlineShop){
          web3.eth.defaultAccount = address;
          history.push("/Home");
        };
      };
    }catch(e){
      alert(e);
    };
  };
;
  const Registration = async (e) => {
    try
    {
      e.preventDefault()
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await web3.eth.personal.unlockAccount(accounts[0],"0",0);
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
      <div className="border-login">
        <div className="border-login__line-top"></div>
        <div className="border-login__text">Вход</div>
          <input onChange={handleLogin} type="text" placeholder="Логин"/>
          <input onChange={hadlePassword} type="password" placeholder="Пароль"/>
          <button className="border-login__button-login" onClick={LogIn}>
            <p>Войти</p>
          </button>
          <button className="login-border__button-signIn" onClick={Registration}>
            <p>Зарегестрироваться</p>
          </button>
        <div className="border-login__line-button"></div>
      </div>
    </>
  );
};

export default Login;