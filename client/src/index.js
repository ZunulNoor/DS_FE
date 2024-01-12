import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import ContextProvider from './Context/context.jsx';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </ContextProvider>,
  rootElement
);
    // "start": "rimraf ./build && react-scripts start",

