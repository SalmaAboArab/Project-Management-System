import ReactDOM from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.css"  
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AuthContextProvider from './Context/Components/AuthContext.tsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer/>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
  
)
