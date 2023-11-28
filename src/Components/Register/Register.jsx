import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Oval} from 'react-loader-spinner';
import { Helmet } from 'react-helmet';



export default function Register() {



  // state form alert
  const[dataExists,setDataExists]=useState(null);
  const[dataSuccess,setDataSuccess]=useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const navigate= useNavigate();

  // send data to backend

  async function allData(data){
    setIsLoad('ture');
    try{
const dataSginUp= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data);

     console.log(dataSginUp);
     console.log(dataSginUp.data.message);
      setDataSuccess(dataSginUp.data.message);
      setTimeout(function () {
        navigate('/Login')
      
      },1000)
    }
    catch(err){
      console.log('erro....' , err);
      console.log(err.response.data.message);
      setDataExists(err.response.data.message);
    }
    setIsLoad('false')
  }
// data in formik
  let userData ={
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
}

const formikObj= useFormik({
  initialValues : userData,

  onSubmit : allData,
   
   
  validate:function(dataError) {
    setDataExists(null);
    const error={};
    if (dataError.name.length<4 ||dataError.name.length>12) {
      error.name= 'Name must be from 4 and 12 characters'
      
    }
    if (dataError.email.includes('@')===false ||dataError.email.includes('.')===false  ) {
      error.email= 'Email IN Vaild'
      
      
    }
    if (! dataError.phone.match(/^01[0125][0-9]{8}$/)) {
      error.phone= 'phone IN Vaild'
      
    }
    if (dataError.password.length<6 ||dataError.password.length>12) {
      error.password= 'password must be from 6 and 12 characters'
     
    }
    if (dataError.rePassword!==dataError.password) {
      error.rePassword= 'password isnot match'
     
    }

    console.log(error);
    return  error;
  }

});

  return<>
  <Helmet>
  <title>Register</title>
   </Helmet>
 
  <div className='w-75 m-auto mt-5' >
  <h1>Register Now :</h1>

  {dataExists?<div className='alert alert-danger'>{dataExists}</div>:''}
  {dataSuccess?<div className='alert alert-success '>{dataSuccess}</div>:''}

  

   <form onSubmit={formikObj.handleSubmit}>
   <div className="mb-3">
    <label htmlFor="name" className="form-label">name :</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} type="text" className="form-control" id="name"/>
    {formikObj.errors.name&&formikObj.touched.name?<div className='alert alert-danger mt-2'>{formikObj.errors.name}</div>:''}
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email :</label>
    <input onBlur={formikObj.handleBlur}  onChange={formikObj.handleChange} value={formikObj.values.email} type='email' id='email' className="form-control"/>
    {formikObj.errors.email&&formikObj.touched.email?<div className='alert alert-danger mt-2'>{formikObj.errors.email}</div>:''}
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password :</label>
    <input onBlur={formikObj.handleBlur}  type="password" className="form-control" id="password"  onChange={formikObj.handleChange} value={formikObj.values.password}/>
    {formikObj.errors.password&&formikObj.touched.password?<div className='alert alert-danger mt-2'>{formikObj.errors.password}</div>:''}
  </div>
  <div className="mb-3">
    <label htmlFor="rePassword" className="form-label">RePassword :</label>
    <input onBlur={formikObj.handleBlur}  onChange={formikObj.handleChange} value={formikObj.values.rePassword}  type="Password" className="form-control" id="rePassword"/>
    {formikObj.errors.rePassword&&formikObj.touched.rePassword?<div className='alert alert-danger mt-2'>{formikObj.errors.rePassword}</div>:''}
  </div>
  <div className="mb-3">
    <label htmlFor="phone" className="form-label">Phone :</label>
    <input onBlur={formikObj.handleBlur}  onChange={formikObj.handleChange} value={formikObj.values.phone}  type="tel" className="form-control" id="phone"/>
    {formikObj.errors.phone&&formikObj.touched.phone?<div className='alert alert-danger mt-2'>{formikObj.errors.phone}</div>:''}
  </div>
  <button disabled={formikObj. isValid===false || formikObj.dirty ===false  } type="submit" className="btn btn-success">

  {isLoad?  <Oval
    height={40}
    width={50}
    color="#fff"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="#4fa94d"
    strokeWidth={2}
    strokeWidthSecondary={2}
  />:' Submit'}
  
  </button>
</form>
</div>


</>
}
