import React, { useState } from "react";
import { UseContext  } from "../../Contract/context";
import {useHistory} from "react-router-dom";
import './login.css';

const Login = () => {
  const { web3, Contract } = UseContext();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [setAccounts] = useState([])
  const [FIO, setFIO] = useState('')

  const hadlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = (e) => {
    setLogin(e.target.value)
  }

  async function logIn() {
    try{
        const address = await Contract.methods.get_address(login).call();
        await web3.eth.personal.unlockAccount(address, password, 0);
        alert("Вы авторизовадись");
        sessionStorage.setItem("address", address);
        sessionStorage.setItem("login", login);
        history.push("/Beer");
    }
    catch(e) {
        alert(e);
    }
  }
  const Registration=async(e)=>{
    e.preventDefault()
    try{
      let adr = await web3.eth.personal.newAccount(password)
      let Users = await web3.eth.getAccounts()
      await web3.eth.sendTransaction({from:Users[0], to:adr, gas: 200000, value: 50000000000000000000})
      Users[0]="Выберите адрес" //затирает нулевой адрес в списке
      setAccounts(Users)
      await web3.eth.personal.unlockAccount(adr,password,600)
      await Contract.methods.addUser(FIO, adr).send({from:adr, gas:200000})
      alert("Вы зарегистрировались, запомните свой адрес: " + adr)
    }catch(e){
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
          <button className="border-login__button-login" onClick={logIn}>
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