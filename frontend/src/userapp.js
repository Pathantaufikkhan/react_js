import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbaru from './components/Navbaru';
import Footer from './components/footer';
import UserHome from './pages/UserHome';
import UserBooks from './pages/UserBooks';
import UserLogin from './pages/UserLogin';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import RegistrationForm from './pages/RegistrationForm';
import UserProfile from './components/UserProfile';
function UserApp() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  return (
    <>
      <Navbaru />
      <Routes>
        <Route
          path='/Userlogin'
          element={<UserLogin setIsAuthenticated={setIsUserAuthenticated} />}
        />
        <Route
          path='/userhome'
          element={isUserAuthenticated ? <UserHome /> : <Navigate to="/user/Userlogin" />}
        />
        <Route
          path='/userbook'
          element={isUserAuthenticated ? <UserBooks /> : <Navigate to="/user/Userlogin" />}
        />
         <Route
          path='/about'
          element={isUserAuthenticated ? <AboutUs /> : <Navigate to="/user/Userlogin" />}
        />
          <Route
          path='/contact'
          element={isUserAuthenticated ? <ContactUs /> : <Navigate to="/user/Userlogin" />}
        />
         <Route
          path='/register'
          element={ <RegistrationForm />  }
        />
           <Route
          path='/userprofile'
          element={ <UserProfile /> }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default UserApp;
