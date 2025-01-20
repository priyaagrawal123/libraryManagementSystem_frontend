import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main React component
import './index.css'; // Optional, for your global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Target the div with id "root"
);
