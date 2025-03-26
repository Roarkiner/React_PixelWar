import axios from 'axios';
import config from '../config.json'
import Cookies from 'js-cookie';
import { getAuthRef } from '../contexts/AuthContext';

const axiosService = axios.create({
	baseURL: config.API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosService.interceptors.request.use(
	(config) => {
		const token = Cookies.get('auth_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosService.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401 || (error.response?.status === 403 && error.response?.data?.message === 
			"Invalid or expired token") && !window.location.pathname.startsWith("/auth")) {
			console.error('Unauthorized, redirecting to login...');
			const auth = getAuthRef().current;
			if(auth)
				auth?.logout();
			window.location.href = "/auth/login";
		}

		return Promise.reject(error);
	}
);

export default axiosService;