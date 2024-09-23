// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import AdminMarketing from './pages/AdminMarketing';
import AdminTelesale from './pages/AdminTelesale';
import Sale from './pages/Sale';
import Telesale from './pages/Telesale';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/admin_marketing' element={<AdminMarketing />} />
                <Route path='/admin_telesale' element={<AdminTelesale />} />
                <Route path='/sale' element={<Sale />} />
                <Route path='/telesale' element={<Telesale />} />
                
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
        </Router>
    );
};

export default App;
