import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import App from '../../App';
import navbarImage from "../../imgs/freshcart-logo.svg";
import { authContext } from '../../context/authenticate';
import { cartContext } from '../../context/cartContext';

function Navbar() {

  const {token , setToken} = useContext(authContext);
  // console.log(token);

  const {numOfCartItems} = useContext(cartContext);

  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>
      <img src={navbarImage} alt='Fresh Cart'/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token ? <>
          <li className="nav-item">
          <Link className="nav-link active text-dark" aria-current="page" to={"/products"}>Products</Link>
        </li>
        
       
        <li className="nav-item ">
          <Link className="nav-link active position-relative" to={"/cart"}>
          <i className="fa-solid fa-cart-shopping text-dark "></i>

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numOfCartItems}
          <span className="visually-hidden">Number Of Cart Items</span>
         </span>
          </Link>
        </li>

        <li className="nav-item ">
          <Link className="nav-link active text-dark" to={"/allorders"}>All Orders</Link>
        </li>
        </> : ""}
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

        <li>
          <i className='fa-brands me-2  fa-facebook'></i>
          <i className='fa-brands me-2 fa-twitter'></i>
          <i className='fa-brands me-2 fa-whatsapp'></i>
          <i className='fa-brands me-2 fa-linkedin'></i>
        </li>

        

       

       {token ? <>
        <li className="nav-item">
          <Link className="nav-link active text-dark" aria-current="page" to={"/profile"}>Profile</Link>
        </li>
       
        <li className="nav-item">
          <span onClick={logout} className="nav-link active text-dark">logout</span>
        </li>
       </> : <>

       <li className="nav-item">
          <Link className="nav-link" to={"/register"}>Register</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/login"}>Login</Link>
        </li>

       </>}
       
      </ul>
     
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar;
