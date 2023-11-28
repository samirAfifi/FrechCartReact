import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Bars, Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/ContextCart';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

    const{addProductToCart}= useContext(cartContext);
    const [loagingSend,setLoagingSend] = useState(null)

    async function addProduct(id){

       setLoagingSend(true);


      const res= await addProductToCart(id);
      console.log(res);
      if(res.status==='success'){
        toast.success(res.message)

      }

      setLoagingSend(false);
    }


      

    const{id}= useParams();
    function getAllDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
   const{data , isLoading } =useQuery('allDetailes' ,getAllDetails);

   console.log(data);

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
  <div className='row align-items-center'>
  <div className='col-md-3'>
  <img className='w-100 mt-5' src={data.data.data.imageCover } alt={data.data.data.title } />
  
  </div>
  <div className='col-md-9'>
   <div className='itemDetalies text-center'>
   <h2>{data.data.data.title}</h2>
   <p className='text-muted'>{data.data.data.description}</p>
   <h6>{data.data.data.category.name}</h6>
   <h6>{data.data.data.price} EGP</h6>
   </div>
   <button onClick={()=> addProduct(data.data.data.id)} className='w-100 main-bg-color p-3 rounded-3 border-white text-center'>

   {loagingSend?<Bars 
    height="35"
    text='center'
    width="35"
    color="#fff"
    ariaLabel="bars-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  /> :'+ Add To Cart'}
   
   
   
   
   
   </button>

  
  </div>


  </div>
  </div>

  </>
}
