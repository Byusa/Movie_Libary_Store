import React from 'react';
import SigninPage from './Pages/SigninPage'
import SignupPage from './Pages/SignupPage'
import HomePage from './Pages/Home/HomePage'
import Profile from './Pages/Profile'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const isAuth = useSelector( state => state.auth.isAuthenticated )

  return (
    <>
      <NavBar />
      <Routes>
        {isAuth && <Route path="/" element={<HomePage />} />}
        {isAuth && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}
export default App;
    
