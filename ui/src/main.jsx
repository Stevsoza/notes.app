import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Routes/Login'
import RootLayout from './Routes/RootLayout'
import Home from './Routes/Home'
import Signup from './Routes/Signup'
import Myredirect from './Routes/Myredirect'
import './index.css'


const router = createBrowserRouter([
  {
    //aqui se crean las rutas que va a contener la aplicación
    path: '/react-app', element: <RootLayout />, children: [
      { path: '/react-app/redirect', element: <Myredirect /> },
      { path: '/react-app/login', element: <Login /> },
      { path: '/react-app/signup', element: <Signup /> },
      { path: '/react-app/home', element: <Home /> }
    ],
    errorElement: 'Hubo un error'
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
