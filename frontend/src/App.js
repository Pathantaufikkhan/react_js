import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import AddBooks from './pages/AddBooks';
import Home from './pages/home';
import Books from './pages/Books';
import AdminLogin from './pages/AdminLogin';
import Users from './pages/users';
// import UserProfile from './components/UserProfile';

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/login'
          element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path='/'
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path='/books'
          element={isAuthenticated ? <Books /> : <Navigate to="/login" />}
        />
        <Route
          path='/addbooks'
          element={isAuthenticated ? <AddBooks /> : <Navigate to="/login" />}
        />
        <Route
          path='/allusers'
          element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
        />

     
      </Routes>
      <Footer />
    </>
  );
}

export default AdminApp;
