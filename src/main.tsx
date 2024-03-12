import ReactDOM from 'react-dom/client'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AuthContextProvider from './Context/Components/AuthContext.tsx'
import React from 'react'
import ToastContextProvider from './Context/Components/ToastContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContextProvider>
    <AuthContextProvider>
      <ToastContainer/>
      <App />
    </AuthContextProvider>
    </ToastContextProvider>
  </React.StrictMode>
  
)
