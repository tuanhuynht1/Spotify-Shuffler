import React, { useEffect, useContext } from 'react';
import {Login} from './components/Login';
import {Content} from './components/Content';
import {GlobalContext} from './GlobalContext';

export const App = () => {
  
	// globals
  	const {token, setToken} = useContext(GlobalContext);

	// check for authen token by parsing url
	useEffect(() => {
		if (token === ''){
			const params = new URLSearchParams(window.location.search);
    		setToken(params.get('access_token'));
		}
	}, [token, setToken]);

	// if authenticated, go to main content, else render login form
	return token ? <Content /> : <Login />;
}
