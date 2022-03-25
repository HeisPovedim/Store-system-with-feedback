import React, {useState} from "react";
import {Context} from './Components/Contract/context';
import {UserList} from './Components/Contract/userList';
import {BrowserRouter as Router} from 'react-router-dom';
import Web3 from 'web3';
import Routers from "./router";

const App = () => {
  const [web3] = useState (new Web3('<http://127.0.0.1:8545>'))
  const Addr = '0xd9145CCE52D386f254917e481eB44e9943F39138'
  const [Contract] = useState(new web3.eth.Contract(UserList, Addr))
  return(
    <Router>
      <Context.Provider value={{web3,Contract}}>
        <Routers/>
      </Context.Provider>
    </Router>
  )
}

export default App;