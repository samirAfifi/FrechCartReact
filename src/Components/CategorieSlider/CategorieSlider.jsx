import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { CirclesWithBar } from 'react-loader-spinner';

export default function CategorieSlider() {

    function getAllCategories(){
     return  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const {data , isLoading}= useQuery('allCategorie',getAllCategories);
    console.log(data?.data.data);
    
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
      };

      if(isLoading){
        return<CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel='circles-with-bar-loading'
      />

      }

  return <>
  <div  className='mb-5'>
  <h2 className='mb-3'>Shop Popular Categories</h2>
  <Slider {...settings}>

  {data?.data.data.map(function(categorie ,idx){ return <div  key={idx}>
    <img style={{width:'100%', height:'200px'}} src={categorie.image
    } alt="slider" />
    <h6>{categorie.name}</h6>
  </div>
 })}



    
    
    
  </Slider>
</div>
  
  
  
  
  </>
  
}
