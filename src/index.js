import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Forms from './models/Login/Forms';
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import './css/mess_chan_style.css';
import './css/chat-block_style.css';
import './css/form_style.css';
import './css/context-menu.css';

import 'react-bootstrap-icons';



const root = ReactDOM.createRoot(document.getElementById('root'));

const id = localStorage.getItem("User");

root.render(
  <React.StrictMode>

     {id ? (
           <App />
      ) : (
        <>
      <Forms/>
       </>
      )}



   

  </React.StrictMode>
);


reportWebVitals();
