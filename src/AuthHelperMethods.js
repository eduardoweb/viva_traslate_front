import axios from 'axios';
import decode from 'jwt-decode';



const loggedIn = () => {
	// Checks if there is a saved token and it's still valid
	const token = getToken() // Getting token from localstorage
	return !!token && !isTokenExpired(token) // handwaiving here
}

const logout = (userData) => {

	// Clear user token and profile data from localStorage
	localStorage.removeItem('id_token');
	localStorage.removeItem('name_user');


}

const isTokenExpired = (token) => {
	try {
		const decoded = decode(token);
		if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
			return true;
		}
		else
			return false;
	}
	catch (err) {
		console.log("expired check failed!");
		return false;
	}
}

const setToken = (idToken) => {
	// Saves user token to localStorage
	localStorage.setItem('id_token', idToken)
}


const getToken = () => {
	// Retrieves the user token from localStorage
	return localStorage.getItem('id_token')
}

const getUserData = () => {
	try {
		let user = decode(getToken());
		return user.data;
	} catch (error) {
		console.log("Token no encontrado " + error);
	}

}

const initAxiosInterceptors = () => {
	axios.interceptors.request.use(function (config) {
		const token = getToken();

		if (loggedIn()) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});
}


export { loggedIn, setToken, initAxiosInterceptors, getUserData, getToken, logout } 