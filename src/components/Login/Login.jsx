import axios from 'axios';
import { useFormik } from 'formik';
// import { error } from 'jquery';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { authContext } from '../../context/authenticate';
import { Helmet } from 'react-helmet';


 function Login() {

  const {setToken} = useContext(authContext);

  const [errMsg , setErrMsg] = useState(null);
  const [ successMsg , setSuccessMsg ] = useState(null);
  const [ isLoading , setIsLoading ] = useState(false);
  const navigate = useNavigate();

  let user = {
   
    email : "" ,
    password : "" 
     
  }


  async function userLogin( values ) {
    // console.log("submitted" , values );

    setIsLoading(true); 
    
    console.log("sending data to backend");

     const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
     

     .catch( (error) =>  {

      console.log("error happened" , error);
      console.log(error.response.data.message);
      setErrMsg(error.response.data.message);
      setIsLoading(false);
     })

     if (data.message === "success"){
      console.log( "login has done Successfully " , data );

      localStorage.setItem("userEmail" , data.user.email);
      
      // console.log(data.token);
      localStorage.setItem("userToken" , data.token);
      setToken(data.token);
      
      setSuccessMsg("Welcome To Your Account");

      setTimeout(function() {
        navigate("/products")
      } , 1500);

      setIsLoading(false);
     }

    
    
  }

  
  




  const formikObj = useFormik({

    initialValues : user ,

    onSubmit : userLogin ,

    validate : function ( values ) {

      // console.log("validating" , values );
      setErrMsg(null);

    const errors = {} ;

     if(values.email.includes("@") === false || values.email.includes(".") === false) {
      errors.email = "Invalid Email";
     }


     if(values.password.length < 8 || values.password.length > 15){
      errors.password = "Password Must Be From 8 to 15 Characters";

     }

     

      //  console.log(errors);
      return errors ;
    }

  })

  


  return (
   <>
     <Helmet>
    <title>Login</title>
  </Helmet>
    <div className='w-75 m-auto'>

      {errMsg ? <div className="alert alert-danger mt-5"> {errMsg}</div> : "" }
      {successMsg ? <div className="alert alert-success mt-5"> {successMsg}</div> : "" }
       
      <h2 className='mt-5 mb-3'>Login To Your Account : </h2>

      <form onSubmit={formikObj.handleSubmit}>
       

        <label htmlFor="email">Email: </label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type='email' placeholder='Email' className='form-control mb-3'/>
        { formikObj.errors.email && formikObj.touched.email ? <div className="alert alert-danger">{formikObj.errors.email}</div> : "" }

        

        <label  htmlFor="password">Password: </label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type='password' placeholder='Password' className='form-control mb-3'/>
        { formikObj.errors.password && formikObj.touched.password ? <div className="alert alert-danger">{formikObj.errors.password}</div> : "" }

         

        <button type='submit' className='btn btn-success' disabled={formikObj.isValid === false || formikObj.dirty === false} >

         {isLoading? <Audio
  height="30"
  width="50"
  color="#fff"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
  /> : "Login" }

   
          </button>

      </form>
        
    </div>
   </>
  )
}

export default Login ;



