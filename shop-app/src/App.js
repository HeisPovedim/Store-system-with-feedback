import React, {useState} from "react";
import {Context} from './Components/contract/context';
import {UserList} from './Components/contract/userList';
import {BrowserRouter as Router} from 'react-router-dom';
import Web3 from 'web3';
import Routers from "./routers";

const App = () => {
  const [web3] = useState (new Web3('http://127.0.0.1:8545'))
  const Addr = '0xD05aC1F2c559c190bDd615ad82F2A2F35E6d17b5'
  const [Contract] = useState(new web3.eth.Contract(UserList, Addr))
  return(
    <Router>
      <Context.Provider value={{web3,Contract}}>
        <Routers/>
      </Context.Provider>
    </Router>
  );
};

export default App;