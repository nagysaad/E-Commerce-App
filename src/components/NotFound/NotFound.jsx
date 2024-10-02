import React from 'react'
import errorImg from"../../imgs/error.svg";

function NotFound() {
  return (
    <div className="text-center my-5" style={{ paddingTop: "50px" }}>
    <img src={errorImg} alt="error" />
  </div>
  )
}

export default NotFound ;
