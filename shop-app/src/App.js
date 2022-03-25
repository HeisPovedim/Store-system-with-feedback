import React, {useState} from "react";
import {Context} from './Components/Contract/context';
import {UserList} from './Components/Contract/userList';
import {BrowserRouter as Router} from 'react-router-dom';
import Web3 from 'web3';
import Routers from "./routers";

const App = () => {
  const [web3] = useState (new Web3('http://127.0.0.1:8545'))
  const Addr = '0x258795529eEe49c6e7Aa6431E429F02DC26499D8'
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