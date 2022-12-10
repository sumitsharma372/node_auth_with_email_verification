import React from'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/main';
import Signup from './components/signup';
import Login from './components/login';
import EmailVerify from './components/emailVerify';

function App() {
  const user = JSON.parse(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element = {user ? <Main /> : <Navigate to='/login' />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
