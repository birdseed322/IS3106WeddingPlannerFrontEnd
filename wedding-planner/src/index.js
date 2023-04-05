import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import App from './App';
//File to mount main App component to the index.html

window.onerror = function (message, source, lineno, colno, error) {
    console.error('An error occurred:', message, source, lineno, colno, error);
    return true;
};
const root = ReactDOM.createRoot(document.getElementById('root'));
// Store the original console.warn function
// Store the original console.error function

root.render( 
    < App / >
 );