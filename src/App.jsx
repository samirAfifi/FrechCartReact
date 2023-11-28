import React from 'react';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Logout from './Components/Logout/Logout';
import Register from './Components/Register/Register';
import Nofound from './Components/NoFound/Nofound';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import { AuthProvider } from './Context/Context';
import ProtectedRoute from './Components/test/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/ContextCart';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart';
import PayCash from './Components/PayCash/PayCash';
import AllOlder from './Components/AllOlder/AllOlder';
import { Offline } from 'react-detect-offline';








const router= createHashRouter ([
  {path:'/',element:<Layout/>,children:[
    {path:'',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'Products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'PayCash',element:<ProtectedRoute><PayCash/></ProtectedRoute>},
    {path:'proflie',element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><AllOlder/></ProtectedRoute>},
    {path:'ProductDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'Login',element:<Login/>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'Categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'Logout',element:<Logout/>},
    {path:'Register',element:<Register/>},
    {path:'*',element:<Nofound/>},

  ]}




])

export default function App() {
  let clineQuery = new QueryClient();
  return <>
  

  <QueryClientProvider   client={clineQuery}>

  <CartContextProvider>

  <AuthProvider>
  <RouterProvider   router={router}/>
  </AuthProvider>

  </CartContextProvider>
  <Toaster/>



  </QueryClientProvider>
    <Offline>
    <div className='position-fixed bottom-0 start-0 bg-dark text-white p-3 rounded-3'>you are offline now.....</div>
    </Offline>


    </>
  
}
