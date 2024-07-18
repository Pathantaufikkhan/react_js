import React from 'react';
import { Link } from 'react-router-dom';
import { RiLogoutBoxFill } from "react-icons/ri";
import { SiGitbook } from "react-icons/si";
// import UserProfile from '../components/UserProfile';
import { CgProfile } from "react-icons/cg";

const Navbaru = () => {
  return (
    <div style={{ borderBottom: "1px solid white" }}>
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="container">
          <Link className="navbar-brand active text-white" to="/user/userhome">MANGA STORE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Link className="nav-item nav-link active text-white m-2" to="/user/userhome">
                Home
              </Link>
              <Link className="nav-item nav-link active text-white m-2" to="/user/userbook">
                Mangas
              </Link>
              <Link className="nav-item nav-link active text-white m-2" to="/user/about">
                About us
              </Link>
              <Link className="nav-item nav-link active text-white m-2" to="/user/contact">
                Contact us
              </Link>
              <Link className="nav-item nav-link active text-white m-l-5"style={{fontSize:"30px"}} to="/user/register">
              <SiGitbook />
              </Link>
              <Link className="nav-item nav-link active text-white " style={{fontSize:"30px"}} to="/user/userlogin">
              <RiLogoutBoxFill />
              </Link>

              <Link className="nav-item nav-link active text-white " style={{fontSize:"30px"}} to="/user/userprofile">
              <CgProfile />
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbaru;
