import React from 'react' ;
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : false 
      };

  return <>

<div className="row mb-5 gx-0">

    <div className="col-sm-9">
    <Slider  {...settings}>
      <div>
        <img style={ {width : "100%" , height : "400px"} } src={require("../../imgs/slider-image-1.jpeg")} alt="slider" />
      </div>
      <div>
      <img style={ {width : "100%" , height : "400px"} } src={require("../../imgs/slider-image-2.jpeg")} alt="slider" />

      </div>
      <div>
      <img style={ {width : "100%" , height : "400px"} } src={require("../../imgs/slider-image-3.jpeg")} alt="slider" />

      </div>
      <div>
      <img style={ {width : "100%" , height : "400px"} } src={require("../../imgs/slider-2.jpeg")} alt="slider" />
      </div>
         </Slider>
    </div>

    <div className='col-sm-3'>
        <img style={ {width : "100%" , height : "200px"} } src={ require("../../imgs/grocery-banner.png") } alt="" />
        <img style={ {width : "100%" , height : "200px"} } src={ require("../../imgs/grocery-banner-2.jpeg") } alt="" />

    </div>
</div>
  
  </>
}

export default HomeSlider;
