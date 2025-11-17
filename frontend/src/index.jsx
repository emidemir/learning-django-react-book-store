import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DetailedViewPage from './pages/DetailedView'
import FavoritesPage from './pages/FavoritesPage'
import ReviewsPage from './pages/ReviewsPage'
import ProfilePage from './pages/ProfilePage'
import ShoppingCart from './pages/ShoppingCart'

const router = createBrowserRouter([
  {path:'/', element:<App/>},
  {path:'/auth', element:<AuthPage/>},
  {path:'/home', element:<HomePage/>},
  {path:'/detailed-view', element:<DetailedViewPage/>},
  {path:'/favorites', element:<FavoritesPage/>},
  {path:'/reviews', element:<ReviewsPage/>},
  {path:'/profile', element:<ProfilePage/>},
  {path:'/cart', element:<ShoppingCart/>},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
