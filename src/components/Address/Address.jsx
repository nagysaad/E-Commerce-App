import React from 'react'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function Address() {

  const { cartId } = useParams();
  //console.log(cartId);

   async function order(values){
       // console.log("my values" , values);
     const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://nagysaad.github.io/E-Commerce-App/allorders` , {
      shippingAddress : values 
     }   ,   {
      headers : { token : localStorage.getItem("userToken")  }
     })

    // console.log("my res" , res);
    // console.log(res.data.session.url);
    window.location.href = res.data.session.url ;


    }

    const formikObj = useFormik({

        initialValues : {
            details : '' ,
            phone : '' , 
            city : ''
        } ,
    
        onSubmit : order ,
    
       
      })
  return <>

  <Helmet>
    <title>Address</title>
  </Helmet>
  
   <div className='w-75 m-auto'>


 
<h2 className='mt-5 mb-3'>Payment </h2>

<form onSubmit={formikObj.handleSubmit}>
 

  <label htmlFor="details">Details : </label>
  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.details} id='details' type='text' placeholder='Details' className='form-control mb-3'/>
 

  

  <label  htmlFor="phone">Phone : </label>
  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} id='phone' type='tel' placeholder='Phone' className='form-control mb-3'/>
 
  <label  htmlFor="city">City : </label>
  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.city} id='city' type='text' placeholder='city' className='form-control mb-3'/>
   

  <button type='submit' className='btn btn-success'>Confirm Payment </button>

</form>
  
</div>
  
  </>
}

export default Address;
