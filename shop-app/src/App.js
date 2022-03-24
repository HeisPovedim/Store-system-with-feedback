import React from "react";
import Web3 from 'web3';
import {BrowserRouter as Router} from 'react-router-dom';
import {UserList} from '../../Contract/UserList';
import {Context} from '../../Contract/Context';
import Routers from '../../router';

const App = () => {
	return(
		<Router>
		<Context.Provider>
			<Routers/>
		</Context.Provider>
		</Router>)
}

export default App;
