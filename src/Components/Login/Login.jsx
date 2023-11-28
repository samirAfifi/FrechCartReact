
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Oval} from 'react-loader-spinner';
import { authContext } from '../../Context/Context';
import { Helmet } from 'react-helmet';


export default function Login() {
  
  // state form alert
  const[dataExists,setDataExists]=useState(null);
  const[dataSuccess,setDataSuccess]=useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const navigate= useNavigate();

  //data return form context

  const{setToken}=useContext(  authContext);

  // send data to backend

  async function allData(data){
    setIsLoad('ture');
    try{
const dataSginUp= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data);

    //  console.log(dataSginUp);
    //  console.log(dataSginUp.data.message);
      setDataSuccess(dataSginUp.data.message);
      // console.log(dataSginUp.data.token);
      localStorage.setItem("tok",dataSginUp.data.token)
      setToken(dataSginUp.data.token);

      setTimeout(function () {
        navigate('/Products')
      
      },1000)
    }
    catch(err){
      console.log('erro....' , err);
     
      setDataExists(err.response.data.message);
    }
    setIsLoad('false')
  }
// data in formik
  let userData ={
    email:"",
    password:"",
}

const formikObj= useFormik({
  initialValues : userData,

  onSubmit : allData,
   
   
  validate:function(dataError) {
    setDataExists(null);
    const error={};
    if (dataError.email.includes('@')===false ||dataError.email.includes('.')===false  ) {
      error.email= 'Email IN Vaild'
       
    }
    
    if (dataError.password.length<6 ||dataError.password.length>12) {
      error.password= 'password must be from 6 and 12 characters'
     
    }
   
    console.log(error);
    return  error;
  }

});
  return<>
  <Helmet>
  <title>Login</title>
   </Helmet>
 
  <div className='w-75 m-auto mt-5' >
  <h1>Register Now :</h1>

  {dataExists?<div className='alert alert-danger'>{dataExists}</div>:''}
  {dataSuccess?<div className='alert alert-success '>{dataSuccess}</div>:''}

   <form onSubmit={formikObj.handleSubmit}>
   
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
  />:'Login'}
  
  </button>
</form>
</div>
  
  
  
  
  
  </>
}
