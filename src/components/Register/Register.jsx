import axios from 'axios';
import { useFormik } from 'formik';
// import { error } from 'jquery';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


 function Register() {

  const [errMsg , setErrMsg] = useState(null);
  const [ successMsg , setSuccessMsg ] = useState(null);
  const [ isLoading , setIsLoading ] = useState(false);
  const navigate = useNavigate();

  let user = {
    name : "" ,
    email : "" ,
    password : "" ,
    rePassword : "" ,
    phone : "" 
  }


  async function registerSubmit( values ) {
    // console.log("submitted" , values );

    setIsLoading(true); 
    
    console.log("sending data to backend");

     const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)

     .catch( (error) =>  {

      console.log("error happened" , error);
      console.log(error.response.data.message);
      setErrMsg(error.response.data.message);
      setIsLoading(false);
     })

     if (data.message === "success"){
      console.log( "Your Data Was Sent Successfully to Backend" , data );
      //show success message to user => navigate him (move him) to login padge
      setSuccessMsg("Account Has Been Created Successfully");

      setTimeout(function() {
        navigate("/login")
      } , 1500);

      setIsLoading(false);
     }

      

    // try{
    // const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
    //        console.log( "Your Data Was Sent Successfully to Backend" , data );


    // }
    // catch(error){
    //   console.log("error happened" , error);
    //   console.log(error.response.data.message);

    // }

    
  }

  
  




  const formikObj = useFormik({

    initialValues : user ,

    onSubmit : registerSubmit ,

    validate : function ( values ) {

      // console.log("validating" , values );
      setErrMsg(null);

    const errors = {} ;

     if(values.name.length < 4 || values.name.length > 12 ){
      errors.name = "Name Must Be From 4 To 12 Characters";
     }

     if(values.email.includes("@") === false || values.email.includes(".") === false) {
      errors.email = "Invalid Email";
     }

     if( !values.phone.match(/^(02)?01[0125][0-9]{8}/)) {
      errors.phone = "Invalid Phone Number";

     }
      

     if(values.password.length < 8 || values.password.length > 15){
      errors.password = "Password Must Be From 8 to 15 Characters";

     }

     if (values.rePassword !== values.password){
      errors.rePassword = "Password and Repassword does not Match";
     }

      //  console.log(errors);
      return errors ;
    }

  })

  


  return (
   <>
    <Helmet>
    <title>Register</title>
  </Helmet>

    <div className='w-75 m-auto'>

      {errMsg ? <div className="alert alert-danger mt-5"> {errMsg}</div> : "" }
      {successMsg ? <div className="alert alert-success mt-5"> {successMsg}</div> : "" }
       
      <h2 className='mt-5 mb-3'>Register Now : </h2>

      <form onSubmit={formikObj.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} id='name' type='text' placeholder='Name' className='form-control mb-3'/>
        { formikObj.errors.name && formikObj.touched.name ? <div className="alert alert-danger">{formikObj.errors.name}</div> : "" }

        <label htmlFor="email">Email: </label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type='email' placeholder='Email' className='form-control mb-3'/>
        { formikObj.errors.email && formikObj.touched.email ? <div className="alert alert-danger">{formikObj.errors.email}</div> : "" }

        <label htmlFor="phone">Phone: </label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} id='phone' type='tel' placeholder='Phone' className='form-control mb-3'/>
        { formikObj.errors.phone && formikObj.touched.phone ? <div className="alert alert-danger">{formikObj.errors.phone}</div> : "" }

        <label  htmlFor="password">Password: </label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type='password' placeholder='Password' className='form-control mb-3'/>
        { formikObj.errors.password && formikObj.touched.password ? <div className="alert alert-danger">{formikObj.errors.password}</div> : "" }

        <label htmlFor="rePassword">Repassword: </label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} id='rePassword' type='password' placeholder='Repassword' className='form-control mb-3'/>
        { formikObj.errors.rePassword && formikObj.touched.rePassword ?  <div className="alert alert-danger">{formikObj.errors.rePassword}</div> : "" }

        <button type='submit' className='btn btn-success' disabled={formikObj.isValid === false || formikObj.dirty === false} >

         {isLoading? <Audio
  height="30"
  width="50"
  color="#fff"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
  /> : "Register" }

   
          </button>

      </form>
        
    </div>
   </>
  )
}

export default Register;


