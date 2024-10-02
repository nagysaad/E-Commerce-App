import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'bootstrap';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

function ProductDetails() {

  

    
    
    const [product , setProduct] = useState({});
    const [loaderGetProduct , setLoaderGetProduct ] = useState(false);

    const prams = useParams();
    // console.log(prams);

    async function getProductDetails() {

      setLoaderGetProduct(true);

        let   { data }  = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${prams.productId}`   // 6428eb43dc1175abc65ca0b3
         // `https://fakestoreapi.com/products/${prams.productId}`
          )

        setProduct(data.data);
        

       global.productCategory = data.data.category.name ;
       console.log(global.productCategory);


       setLoaderGetProduct(false)

    }

    // console.log(product);
    

   


    useEffect(() => {

       getProductDetails(prams.productId);
    } , [])

    const [loading , setLoading] = useState(false);


    const { addProductToCart } = useContext(cartContext);

   async function addProduct(id){

    setLoading(true);

     const res =  await addProductToCart(id);

     console.log(res)

     if(res.status === "success"){
      //console.log(res.message);
      toast.success(res.message , {
        position : "top-center" , 
        duration : 2000 , 
      });

     } else{
      toast.error("Error Happend")
     }

     setLoading(false);

    }


  return <>

 


{loaderGetProduct===true ? <div className="vh-100 d-flex justify-content-center" >
    <ColorRing
    visible={true}
    height="100"
    width="100"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    </div> : <div className="product-details d-flex justify-content-between align-items-center gap-22 mt-5 mb-5">

       <Helmet>
         <title>{product.title?.split(" ").slice( 0 , 2).join(" ")}</title>
     </Helmet>
        <div>
        <img className="w-100" src={product.imageCover} alt="Product" />
        </div>
         
          <div className='grow'>
          <h5> {product.title}</h5>
          <h6 className='desc'> {product.description}</h6>
          <p className='f-bold'> {product.price} EGP</p>
          <button onClick={()=> addProduct(product.id)}  className='btn btn-success w-100 bg-color'>
            {loading === true ?  <div className="d-flex justify-content-center align-items-center">
              <Bars
  height="40"
  width="40"
  color="#fff"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
            </div> : "+ Add To Cart" }
          </button>

          
          

          </div>
          {/* <button  className="btn btn-success mt-2 mb-2 w-100">Add To Cart</button> */}
  
       </div>  }


  
  
  </>

    
    
      
          
          

          
        
    
  
}

export default ProductDetails ;
