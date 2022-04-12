import React, {useState} from "react";
import {Context} from './Components/Contract/context';
import {UserList} from './Components/Contract/userList';
import {BrowserRouter as Router} from 'react-router-dom';
import Web3 from 'web3';
import Routers from "./routers";

const App = () => {
  const [web3] = useState (new Web3('http://127.0.0.1:8545'))
  const Addr = '0x149388c951759c84EF9D5f4D08A07c7304A6c516'
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