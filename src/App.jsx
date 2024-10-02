
import './App.css';
import { createBrowserRouter , RouterProvider   } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Products from "./components/Products/Products"

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { CartContextProvider } from './context/cartContext';
import { AuthProvider } from './context/authenticate';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Cart from './components/Cart/Cart';
import Address from './components/Address/Address';
import Allorders from './components/AllOrders/Allorders';
import { Offline } from 'react-detect-offline';








const myRouter = createBrowserRouter([

  {path : "/" , element :  <Layout />  , children : [
    {path : "" , element : <ProtectedRoute> <Products /> </ProtectedRoute>} , 
    {path : "products" , element : <ProtectedRoute> <Products /> </ProtectedRoute>} ,
    {path : "products/:productId" , element : <ProtectedRoute> <ProductDetails /> </ProtectedRoute>} ,  
    {path : "cart" , element : <ProtectedRoute> <Cart /> </ProtectedRoute>} , 
    {path : "profile" , element : <ProtectedRoute> <Profile /> </ProtectedRoute>} ,
    {path : "address/:cartId" , element : <ProtectedRoute> <Address /> </ProtectedRoute>} , 
    {path : "allorders" , element : <ProtectedRoute> <Allorders /> </ProtectedRoute>} , 
    {path : "login" , element : <Login />} , 
    {path : "register" , element : <Register />} , 
    {path : "*" , element : <NotFound />} 



  ]}

])

export default function App() {

  let queryClient = new QueryClient();
  
  return  <>

  <QueryClientProvider client={queryClient}>
    <CartContextProvider>
       <AuthProvider>
         <RouterProvider router={myRouter} />
       </AuthProvider>
    </CartContextProvider>

    <Toaster />



  </QueryClientProvider>

  <Offline>
    <div className="position-fixed top-50 start-0 bg-dark text-light p-3">
      <h2>Oops you are Offline now....</h2>
    </div>
  </Offline>
      
   
   
   
   
    </>
  
}


