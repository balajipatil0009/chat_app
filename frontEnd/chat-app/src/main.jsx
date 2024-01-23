import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'

import App from './App.jsx'
import Login from './pages/Login.jsx'
import Resister from './pages/Resister.jsx'
import GroupChat from './pages/GroupChat.jsx'
import Chat from './pages/Chat.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:"/resister",
    element:<Resister/>

  },
  {
    path:"/groups",
    element: <GroupChat/>
  },
  {
    path: '/chats',
    element: <Chat/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
