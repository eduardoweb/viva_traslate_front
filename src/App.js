import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Registro from "./components/Registro/Registro";
import Quizzes from "./containers/Quizzes";
import { loggedIn } from "./AuthHelperMethods";
import { useNavigate } from 'react-router-dom';
import { initAxiosInterceptors } from "./AuthHelperMethods";
import store from './redux/store';

import { Provider } from 'react-redux';

initAxiosInterceptors();

function App() {

	console.log(store.getState())
	let text = "";

	return (
		<Provider store={store}>
			<div>
				<Routes>
					<Route path="/" element={<Dashboard />}> </Route>
					<Route path="/login" element={<Login />}> </Route>
					<Route path="/registro" element={<Registro />}> </Route>
					<Route path="/quizzes" element={<Quizzes />}> </Route>
				</Routes>
			</div>
		</Provider>
	);
}

export default App;

