import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../Context/Context';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorieSlider from '../CategorieSlider/CategorieSlider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Products() {

  function getAllProduct(){
   return axios.get('https://ecommerce.routemisr.com/api/v1/products');

  }


  const {isError,isFetching,isLoading ,data}= useQuery('allProduct',getAllProduct);
  console.log(data?.data.data);






  // const[allProduct,setAllProduct]=useState(null)


  //  async function getAllProduct(){

  //  const{data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products')

  //  console.log(data.data); 
  //  setAllProduct(data.data);
  // }
  // useEffect(function(){
  //   getAllProduct();

  // },[])

  if(isLoading){


    return   <div className='vh-100 d-flex justify-content-center align-items-center '>
    <Circles
    height="180"
    width="180"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
    </div>


  }





  return <>

  <Helmet>
  <title>All_Product</title>
   </Helmet>
 
  <div className='container'>
  <div className='row gx-0 mb-5 mt-3'>
  <div className='col-sm-9'>
  <HomeSlider/>
  </div>
  <div className='col-sm-3'>
  <img style={{ width:'100%',height:'200px'}} src={require('../../images/grocery-banner.png')} alt="slider" />
  <img style={{ width:'100%',height:'200px'}} src={require('../../images/grocery-banner-2.jpeg')} alt="slider" />
  </div>
  
  </div>

  <CategorieSlider/>
  
  <div className='row gy-3'>
  {data?.data.data.map(function(product){ return  <div className='col-lg-2 col-md-4 col-sm-6'>
  <Link to={`/ProductDetails/${product.id}` }>
  <div className='item-product'>
  <img src={product.imageCover} className='w-100' alt="product-img" />
  <h6 className='main-color'>{product.category.name}</h6>
  <h5> {product.title.split(' ').slice(0,2).join('')} </h5>
  <div className='d-flex justify-content-between align-items-center '>
  <p>{product.price} EGP</p>
  <p><span><i className="fa-solid fa-star"/></span> {product.ratingsAverage}  </p>
  </div>
  <p>{product.id}</p>
  </div>
  </Link>
 </div> })}


   </div>
  </div> 

  
  
 
  
  
  </>
}
