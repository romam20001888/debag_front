import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./componenst/header/Header.js";
import Menu from "./componenst/Menu/Menu.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="Header">
      <Header />
    </div>
    <div className="container">
        <div className="Menu">
          <Menu />
        </div>
        <div className="Content">
          <App />
        </div>
    </div>
  </React.StrictMode>
);

