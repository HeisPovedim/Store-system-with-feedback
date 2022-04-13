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
      console.log(address);
      await web3.eth.personal.unlockAccount(address, password,0);
      const protectPassword = await web3.utils.keccak256(password);
      await Contract.methods.login_user(login, protectPassword).send({from:address});
      const online = await Contract.methods.check_logged(login).call();
      console.log(online);
      localStorage.setItem("address", address);
      const AddrInfo = await Contract.methods.structUsers(address).call();
      console.log(AddrInfo);
      setBalance(AddrInfo[2])
      console.log(balance);
      setRole(AddrInfo[3])
      console.log(role);
      if(online){
        web3.eth.defaultAccount = address;
        history.push("/Beer");
      }
    }
    catch(e) {
      alert(e);
    }
  }

  const Registration=async(e)=>{
    try
    {
      e.preventDefault()
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
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
      alert("аккаунт создан, ваш адрес:"+ address)
    } catch(e) {
      alert(e)
    }
  }

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