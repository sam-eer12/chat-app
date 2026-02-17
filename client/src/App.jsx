import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useContext(AuthContext);

  // Show a loading spinner while checking auth status
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] h-screen w-screen bg-no-repeat bg-cover overflow-hidden'>
      <Toaster />
      <Routes>
        <Route 
          path="/" 
          element={authUser ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!authUser ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile" 
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
};

export default App;