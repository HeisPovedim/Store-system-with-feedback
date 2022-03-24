import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Componenta/Login/Login";



const Routers = () => {
	return (
	<Switch>
		<Route path="/" component={Login} exact />
		<Route path="/Authorization" component={Login} exact />
	</Switch>);};
export default Routers;