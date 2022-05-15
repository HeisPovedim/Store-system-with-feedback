import React, {useState} from "react";
import {Context} from './components/contract/context';
import {UserList} from './components/contract/userList';
import {BrowserRouter as Router} from 'react-router-dom';
import Web3 from 'web3';
import Routers from "./routers";

const App = () => {
  const [web3] = useState(new Web3('http://127.0.0.1:8545'));
  const Addr = '0x6cA1f8C4A7a7aF4601d92f2B6A02209B2B03A9Bf';
  const [Contract] = useState(new web3.eth.Contract(UserList, Addr));
  return(
    <Router>
      <Context.Provider value={{web3,Contract}}>
        <Routers/>
      </Context.Provider>
    </Router>
  );
};

export default App;