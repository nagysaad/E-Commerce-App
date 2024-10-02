import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

function Allorders() {

  
  const res = jwtDecode(localStorage.getItem("userToken"));
    let userId = (res.id);

  const [userOrders , setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserOrders() {
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      console.log(data);
      setUserOrders(data);
    } catch (err) {
      console.log("error" , err);
    }

    setIsLoading(false);  // توقف عرض الـ loader
    
  }


  useEffect(() => {

    getUserOrders();
  
  } , [])

  //console.log("userId is : " , userId);
  
  if ( isLoading === true) {
    return <div className=" vh-100 d-flex justify-content-center align-items-center" >
    <ColorRing
    visible={true}
    height="100"
    width="100"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    </div>
  }

  if (userOrders.length === 0){
    return <div className=" vh-100 d-flex justify-content-center align-items-center" >
    <h3 className="text-dark">No orders found.</h3>
  </div>
  }


  
  return <>

<Helmet>
    <title>All Orders</title>
  </Helmet>

  <div className="container ">
    
    <div className="orders text-light f-bold ">

      {userOrders.map((order , idx) => {

        return <div key={idx}  className="order  bg-info rounded-4 p-3 ">

          <div className="container">
            <div className="row">
             
              {order.cartItems?.map((item , index) => {
            return <div key={index} className='my-item col-sm-4 bg-success rounded-4 p-3 mb-3'>
              <img className='w-100 mb-2' src={item.product.imageCover} alt="" />
              <h6>{item.product.title.split(" ").slice(0, 2).join(" ")}</h6>
              <p> Count : {item.count}</p>
              <p> Price : {item.price}EGP</p>

            </div>
          })}

              
            </div>
          </div>

        
           

        <p>This Order sent to User with Phone : {order.shippingAddress.phone }</p>
        <p>Details: {order.shippingAddress.details } , {order.shippingAddress.city}</p>
        <p>Payment Method : {order.paymentMethodType}</p>
        <p>Total Price : {order.totalOrderPrice}EGP</p>


      </div>
    } )}

      
    </div>
  </div>
  
  </>
}

export default Allorders;
