import React, { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logoImg from '../../images/freshcart-logo.svg';
import { authContext } from '../../Context/Context';
import { cartContext } from '../../Context/ContextCart';




export default function Navbar() {

 const{token ,setToken}=useContext(authContext);
 const navigate= useNavigate();
 const{numOfCartItems}= useContext(cartContext)

 function Logout() {
  localStorage.removeItem("tok");
  setToken('null');
  setTimeout(function(){ navigate('./Login');},500)
 
 }
  return <>

  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="#">
    <img src={logoImg}/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {token?<> <ul className="navbar-nav me-auto mb-2 mb-lg-0">
     <li className="nav-item">
       <Link className="nav-link active" aria-current="page" to="/Products">Products</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" to="/Categories">Categories</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" to="/brands">brands</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link position-relative" to="/cart">
       Cart
       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
       {numOfCartItems}
      
    <span className="visually-hidden">unread messages</span>
  </span>

       </Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" to="/allorders">All Older</Link>
     </li>
   </ul></>:''}
      
    </div>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center pe-auto">
      <li className="nav-item pe-auto ">
        <i className="fa-brands me-2   fa-facebook" style={{cursor:'pointer'}} ></i>
        <i className="fa-brands me-2 fa-twitter" style={{cursor:'pointer'}} ></i>
        <i className="fa-brands me-2 fa-whatsapp" style={{cursor:'pointer'}} ></i>
        <i className="fa-brands me-2 fa-linkedin" style={{cursor:'pointer'}} ></i>
        </li>


        {token?<> <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/proflie">Profile</Link>
      </li>
        <li className="nav-item">
          <span onClick={Logout} className="nav-link pe-auto " style={{cursor:'pointer'}} >Logout</span>
        </li></>: <> 
        <li className="nav-item">
        <Link className="nav-link" to="/Register">Register</Link>
      </li>
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
      </li></>}
    
  
       
       
      </ul>
      
    </div>
  </div>
</nav>
  
  
  
  
  
  
  
  </>
}
