import React from 'react';
import {render} from 'react-dom';
import {App} from './App';
import {GlobalProvider} from './GlobalContext'
import './index.css';


// provide all react elements with global context
render(
  <GlobalProvider>
    <App/>
  </GlobalProvider>,
  document.getElementById('root')
);