
import React from 'react';
import { Link } from 'react-router-dom';
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
const Navbar = () => {
  return (
   <div style={{borderBottom:"1px solid white"}}><nav className="navbar navbar-expand-lg bg-black" >
   <div className="container">
     <a className="navbar-brand active text-white " href="/">MANGA STORE</a>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
         <Link className="nav-item nav-link active text-white" to="/">
         Home
         </Link>
         <Link className="nav-item nav-link active text-white" to="/books">
         Mangas
         </Link>
         
         <Link className="nav-item nav-link active text-white" to="/addbooks">
         Add Mangas
         </Link>

         <Link className="nav-item nav-link active text-white" to="/allusers">
         <FaUsers className='m-l-5' style={{fontSize:"30px", color:"white"}} />
         </Link>
         
         <Link className="nav-item nav-link active text-white" to="/login">
         <RiLogoutBoxFill  style={{fontSize:"30px"}}/>
         </Link>
         
       </ul>
    
     </div>
   </div>
 </nav></div>
  );
};

export default Navbar;
