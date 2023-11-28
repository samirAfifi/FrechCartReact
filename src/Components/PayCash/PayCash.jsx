import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../../Context/ContextCart';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function PayCash() {

   const {cartId,setCartProduct, setNumOfCartItems,setTotalCartPrice}=useContext(cartContext)

   console.log(cartId);


   // function pay online.......
  async function getPayOnLine(){
    const cityValue=document.querySelector('#city').Value;
    const phoneValue=document.querySelector('#phone').Value;
    const detailsValue=document.querySelector('#details').Value;


   const shipping= {
    "shippingAddress":{
        "details": detailsValue,
        "phone": phoneValue,
        "city": cityValue
        }
} 
try {
  const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, shipping ,
  {
    headers:{token:localStorage.getItem('tok')},
    params:{url:'http://localhost:3000'}
  })
  
     console.log(data);
     window.open(data.session.url ,'_self' )
  
} catch (error) {
  console.log('error' , error);
}
   }
     // function pay cash.......
  async function getPayCash(){
    const cityValue=document.querySelector('#city').Value;
    const phoneValue=document.querySelector('#phone').Value;
    const detailsValue=document.querySelector('#details').Value;


   const shipping= {
    "shippingAddress":{
        "details": detailsValue,
        "phone": phoneValue,
        "city": cityValue
        }
} 
    try {
     const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shipping ,{headers:{token:localStorage.getItem('tok')}})
     console.log(data);

     if(data.status==='success'){
        toast.success('older success');
        setCartProduct([])
    setNumOfCartItems(0)
    setTotalCartPrice(0)
        

     }else{
        toast.error('error')
     }
    }

    catch (error) {
      console.log('error',error);
      
    }
  }
  return<>
  <Helmet>
  <title>Pay..</title>
   </Helmet>
 


  <div className='container py-5'>
  <form>
  <div className="mb-3">
    <label htmlFor="city" className="form-label">city</label>
    <input type="text" className="form-control" id="city"/></div>
   
  <div className="mb-3">
    <label htmlFor="phone" className="form-label">phone</label>
    <input type="number" className="form-control" id="phone" />
  </div>
  <div className="mb-3">
  <label htmlFor="details" className="form-label">details</label>
  <textarea className="form-control" id="details" rows={3} />
</div>

<div className='d-flex justify-content-between'>
<button type='button' onClick={getPayCash} className="btn btn-primary">Confirm Cash Payment</button>
<button type='button' onClick={getPayOnLine} className="btn btn-warning">Confirm OnLine Payment</button>
</div>
</form>

  </div>

  </>




}
