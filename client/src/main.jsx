import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx';
import Sign from './components/Sign.jsx';
import Authorised from './components/Authorised.jsx';
import Options from './components/Options.jsx';

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
    path: '/sign',
    element: <Sign />,
  },
  {
    path: '/protected',
    element: <Authorised />,
  },
  {
    path: '/options',
    element: <Options />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
