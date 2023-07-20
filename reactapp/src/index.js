import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DataProvider} from './Context/context';
import {BrowserRouter} from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

     
          <BrowserRouter>
           <AuthProvider>
        <DataProvider>
        <App />
        </DataProvider>
        </AuthProvider>
        </BrowserRouter>
       



);
//<script src="url/https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();