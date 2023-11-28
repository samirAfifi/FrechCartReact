import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import logoImg from '../../images/freshcart-logo.svg';
import { Helmet } from 'react-helmet';
export default function Profile() {


  const [name, setName] = useState(null);

  useEffect(() => {
   const res= jwtDecode( localStorage.getItem('tok'))
   console.log(res);
   setName(res.name)

  }, []);






  return <>
  <Helmet>
  <title>Profile</title>
   </Helmet>
 

  <div style={{background:'#eee'}} className='container my-5 '>
  <img className='my-5 text-center' src={logoImg} alt='logo' />
  <h1 className='p-3 text-center' >Welcome : {name}</h1>
  </div>
  
  
  </>
}
