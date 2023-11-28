import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Circles } from 'react-loader-spinner';

export default function Categories() {


  const[allCategorie, setAllCategorie]=useState(null);






  async function AllCategor(){

    try {
      const {data}=  await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      console.log(data);
      setAllCategorie(data)
      
    } catch (error) {
      console.log('error' , error);
      
    }
 
   
  

  }
  if (allCategorie===null) {
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
  <title>Categories</title>
   </Helmet>
 
    <div className='container'>
    <div className='row'>
    {allCategorie.map(function(categorie , idx){ return  <div    key={idx} 
    className='col-md-4'>
    <div className='item text-center'>
    <img src={categorie.image} alt="categories-image" />
    <h3>{categorie.name}</h3>
    <h4>{categorie.createdAt}</h4>
    </div>
    </div>})}



    
    </div>
    </div>

  </>
}
