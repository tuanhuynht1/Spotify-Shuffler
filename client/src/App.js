import React, { useEffect, useContext } from 'react';
import {Login} from './components/Login';
import {Main} from './components/Main';
import {GlobalContext} from './GlobalContext';

export const App = () => {
  
  const {token, setToken} = useContext(GlobalContext);

	// check for authen token
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
    setToken(params.get('access_token'));
	}, [token, setToken]);

	return token ? <Main /> : <Login />;
}
