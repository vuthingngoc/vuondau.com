import React from 'react';
import ReactDOM from 'react-dom';
// styles
import 'bootstrap/scss/bootstrap.scss';
import './assets/scss/paper-kit.scss';
import './assets/demo/demo.css';
import './assets/demo/react-demo.css';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
