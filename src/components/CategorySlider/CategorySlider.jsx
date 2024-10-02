import React from 'react'
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { Blocks } from 'react-loader-spinner';

function CategorySlider() {

    function getAllCategories(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const  {data , isLoading} = useQuery("categorySlider" , getAllCategories , {
        refetchOnMount : false 
    })

    // console.log(data?.data.data);




    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows : false 
      };


      if(isLoading === true){
        return <div className="d-flex justify-content-center align-items-cenyer mt-5
        mb-5">
            <Blocks 
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true} />
        </div>
      
      }

  return <>


    <h2 className='mb-3'>Categories Slider</h2>
   
    <Slider className='mb-5'   {...settings}>
      {data?.data.data.map((category , idx) => (
       <div key={idx}>
      <img style={ {width : "100%" , height : "200px"} } src={category.image} alt="slider" />
      <p className='mt-2'>{category.name}</p>

       </div>
    ))}
         </Slider>
   

    

  
  </>
}

export default CategorySlider;

