import React, { useState } from "react"
import { Context } from './components/contract/context'
import { UserList } from './components/contract/userList'
import { BrowserRouter as Router } from 'react-router-dom'
import Web3 from 'web3'
import Routers from './routers'

const App = () => {
  const [web3] = useState(new Web3("http://127.0.0.1:8545"))
  const Addr = "0x65ccad10e0d4355AC74F1D9B7Ec01c7fdb614995"
  const [Contract] = useState(new web3.eth.Contract(UserList, Addr))
  return(
    <Router>
      <Context.Provider value={{web3,Contract}}>
        <Routers/>
      </Context.Provider>
    </Router>
  )
}

export default App