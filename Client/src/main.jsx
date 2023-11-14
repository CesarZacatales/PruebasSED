import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {ConfigProvider} from './contexts/ConfigContexts';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import {UserContextProvider} from './contexts/UserContext';

axios.defaults.baseURL=import.meta.env.VITE_APIENDPOINT || "http://localhost:3000/api";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
     <ConfigProvider>
     <UserContextProvider>
      <App />
      <ToastContainer theme='dark' position='bottom-right'/>
       <LoadingSpinner/>
       </UserContextProvider>
     </ConfigProvider>
   </BrowserRouter>


  </React.StrictMode>
)
