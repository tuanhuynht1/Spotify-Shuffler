import React from 'react';
import {render} from 'react-dom';
import {App} from './App';
import {GlobalProvider} from './GlobalContext'
import './index.css';

render(
  <GlobalProvider>
    <App/>
  </GlobalProvider>,
  document.getElementById('root')
);