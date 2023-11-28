import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Circles, Oval } from 'react-loader-spinner';
export default function AllOlder() {
 
    const [userIlders, setSserIlders] = useState(null);

    useEffect(()=>{

     const res=jwtDecode(localStorage.getItem('tok'));

    //  console.log(res.id);
    //  setGetId(res.id)
     getAllOlder(res.id)
    },[])

    async function getAllOlder(id){
        try {
        const{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);

        setSserIlders(data);
        console.log(data);
        } catch (e) {
            console.log('error' , e);
            
        }
    }
    if(userIlders===null){
        return    <div className='vh-100 d-flex justify-content-center align-items-center '>
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
    <title>All_Older</title>
     </Helmet>
   
    <div className='container my-5'>
    <div className='row g-5'>


    {userIlders.map(function(older ,idx){return <div key={idx } className='col-md-6'>
    <div style={{backgroundColor :'#eee'}} className='rounded-4 p-3 text-center'>

    <div className='container my-5'>
    <div className='row '>
    {older.cartItems?.map(function(items ,index){
         return <div key={index} className='col-sm-4'>
         <img className='w-100' src={items.product.imageCover}alt="imageCover" />

         <p>{items.product.title.split(' ').slice(0,3).join(' ')}</p>
         <h6> Count : {items.count}</h6>
         <h6> price:  {items.price} EGP</h6>

         
         
         
         
         </div>  })}

    </div>
    </div>





    <h6> oreder set to user with Name  : {older.user.name} . </h6>
    <h6> oreder set to user with phone : {older.user.phone} . </h6>
    <h6> user create older in: {older.createdAt} . </h6>
    <h6> user payment : {older.paymentMethodType} . </h6>
    <h6>Totel price : {older.totalOrderPrice} . </h6>
    </div>

 
    </div> })}

    
    
    
    
    </div>
    </div>
    
    
    
    </>
  
  
  
  }
  
