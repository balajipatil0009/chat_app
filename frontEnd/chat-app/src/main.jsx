import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// import { StrictMode } from 'react';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Resister from './pages/Resister.jsx';
import Chats from './pages/Chats.jsx';
import Error from './pages/Error.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/resister',
    element: <Resister />,
  },
  {
    path: '/chats',
    element: <Chats />,
  },
  {
    path: '/error',
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // for avoid twice execution of useEffect we removed StrictMode
  <RouterProvider router={router} />
);
