import React from "react";
import amazon from "../../imgs/Amazon_Pay-Logo.wine.svg"
//import amazon from "../../Assets/images/Amazon_Pay-Logo.wine.svg";
import express from "../../imgs/675747.webp";
import master from "../../imgs/MasterCard-Logo-1990.png";
import paypal from "../../imgs/pa4344888-paypal-logo-40-free-paypal-amp-please-donate-images.png";
import appStore from "../../imgs/Download_on_the_App_Store_Badge.svg.png";
import googlePlay from "../../imgs/google-play-badge-logo.svg";

export default function Footer() {
  return (
    <>
      <div className="bg-secondary-subtle w-100 mt-4 py-5 px-5">
        <h4>Get the FreshCart app</h4>
        <p className=" text-dark-50">
          We will send you a link, open it on your phone to download the app
        </p>
        <div className="d-flex">
          <input
            type="email"
            placeholder="Email"
            className="form-control me-3"
          />
          <button
            className="btn bg-main text-dark-50"
            style={{ width: " 170px" }}
          >
            Share App Link
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center mx-4">
          <div className="payment d-flex align-items-center py-3 px-1">
            <span className="fw-bold">Payment Partners</span>
            <img
              src={amazon}
              alt="Amazon logo"
              width={60}
              className="ms-2 mt-0"
            />
            <img
              src={express}
              alt="American Express logo"
              width={60}
              className="ms-2 mt-0"
            />
            <img
              src={master}
              alt="Master card logo"
              width={60}
              className="ms-2 mt-0"
            />
           
          </div>
          
        </div>

        <div >
          <ul className="text-center fw-bold ">
            <li className="nav-item d-flex align-items-center justify-content-center">
               <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
            </li>
          </ul>
        </div>

        <div className="text=center">
          <p className="text-center mt-3 mb-0">
            <span className="fw-bold me-2">Created by</span>
          Nagy Saad © 2024
          </p>
        </div>
      </div>
    </>
  );
}

