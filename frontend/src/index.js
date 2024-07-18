  import React from 'react';
  import ReactDOM from 'react-dom';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import AdminApp from './App';
  import UserApp from './userapp';
  import './index.css';

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/*" element={<AdminApp />} />
          <Route path="/user/*" element={<UserApp />} />
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
