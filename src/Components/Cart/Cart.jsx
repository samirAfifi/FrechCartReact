import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../Context/ContextCart'
import { Circles } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Cart() {
   const{getUpdateProduct,cartProduct,numOfCartItems,totalCartPrice ,deleteProduct ,clearCartData,cartId}= useContext(cartContext);

//  function el updata....
  async function updateElement(id , count){
    const res=await getUpdateProduct(id, count);
    if( res.status==="success"){
      toast.success('updata product')

    }else{
      toast.error('error to updata Product')
    }

   }


//  function el delete....
   async function Delete(id){

   const res= await deleteProduct(id);
   
   if(res.data.status==='success'){
    console.log('res' ,res);
    toast.success('product is remove')
   }else{
    toast.error('error')
   }

   }

   //  function el clear cart....
   async function clearCart(){

    await clearCartData();
  }


 
   if(cartProduct === null){
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
   
   if(cartProduct.length === 0 || cartProduct == null){
    return<>
    <div className='text-center m-5'><h1>No Data Found In Your Cart</h1><Link className='text-success h2' to='/Products'> ---Get Some Product</Link></div>
    </>
  }



  return <>

  <Helmet>
  <title>Cart</title>
   </Helmet>
 
  <div className='container  my-5' style={{backgroundColor:'#eee'}}>
  <h1>Shop Cart :</h1>
  <h3 className='text-success'>Total Cart Price : {totalCartPrice}</h3>
  <h3>Total Items : {numOfCartItems}</h3>
  <div className='d-flex justify-content-between'>
  <button onClick={clearCart} className='btn btn-outline-danger'>Clear Cart</button>
  <Link type="button" className='btn btn-outline-secondary' to='/PayCash'> Pay cash </Link>
  </div>
  {cartProduct.map(function(product ,idx)
{ return <div key={idx} className='row my-2 border-bottom border-3 align-items-center p-2 '>
  <div className='col-sm-1'>
  <img className='w-100' src={product.product.imageCover} alt="no" />
  </div>
  <div className='col-sm-9'>
  <h5>{product.product.title}</h5>
  <h6> price : {product.price}</h6>
  <button onClick={()=>Delete(product.product.id)}  className='btn btn-outline-danger'><i className="fa-solid fa-trash-can" /> Remove</button>
  </div>
  <div className='col-sm-2'>
  <div className='d-flex align-items-center'>
  <button onClick={()=>updateElement(product.product.id , product.count +1)} className='btn btn-outline-success'>+</button>
  <span className='mx-2'>{product.count}</span>
  <button onClick={()=>updateElement(product.product.id , product.count -1)} className='btn btn-outline-success'>-</button>
  </div>
  </div>
  </div> })}



  
  </div>
  
  
  
  </>
}
