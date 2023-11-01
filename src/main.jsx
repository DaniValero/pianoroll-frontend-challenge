import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import { AppProvider } from './utils/context';

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
)
