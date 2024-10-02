import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext';
import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Cart() {

  const { cartProducts , totalCartPrice , numOfCartItems , deleteProductFromCart , 
     updateCount , clearCartData , cartId } =  useContext(cartContext) ;

     console.log("User cartId is : " , cartId);
 

 async function deleteFromCart(id){
 
   const res = await deleteProductFromCart(id);

   if(res.status === "success"){
    toast.success("Product Removed Successfully From Cart");
   } else{
    toast.error("Error Happend");
   }

   

  }

 async function updateElementCount( id , count){
    const res = await updateCount(id , count);

    if(res.status === "success"){
      toast.success("Updated Successfully");
     } else{
      toast.error("Error Happend");
     }
  }

  if(cartProducts === null){
    return <div className="vh-100 d-flex justify-content-center align-items-center" >
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

  if(cartProducts.length === 0){
    return<>
    <h1 className=" vh-100 d-flex justify-content-center align-items-center">
      No Products Found in your Cart</h1>
    </>
  }



  return <>

<Helmet>
    <title>Cart</title>
  </Helmet>

    <div style={ { backgroundColor : "#eee" } } className='container mt-5 p-3'>
 
 <h2>Shop Cart  </h2>
 <h5>Cart Items : {numOfCartItems}</h5>

  <div className="d-flex align-items-center gap-22 my-3">
    <Link to={`/address/${cartId}`} className='btn btn-success bg-color'>Confirm Payment</Link>
  <h5>Total Price :  {totalCartPrice} EGP </h5>
  </div>
  <button onClick={ clearCartData } className='btn btn-danger'>Clear Cart</button>

   {cartProducts.map((product , idx ) => {

    console.log(product);

    return <div key={idx} style={ { borderBottom : "1px solid #ccc" } } className="product-row row align-items-center my-3 p-3">

    <div className="col-sm-2">
        <img src={product.product.imageCover} className='w-100' alt="" />
    </div>

    <div className="col-sm-8">
        <h6> {product.product.title} </h6>
        <h6>Price : {product.price} EGP </h6>
        <button onClick={()=> deleteFromCart(product.product.id)} className='btn btn-outline-danger'>Remove</button>
    </div>

    <div className="col-sm-2 ">

    <div className="d-flex justify-content-center align-items-center ">
    <div onClick={()=> updateElementCount(product.product.id , product.count + 1)} className=" btn btn-outline-success"> + </div>
    <span  className='mx-2'>{product.count}</span>
    <div onClick={()=> updateElementCount(product.product.id , product.count - 1)} className="col-sm-1 btn btn-outline-success"> - </div>
    </div>

    </div>
  </div>
   })}

  
 

  </div>

  </>

}
 

export default Cart;
