import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const App = () => {

  const {authUser} = useContext(AuthContext)
  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] h-screen w-screen bg-no-repeat bg-cover overflow-hidden'>
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
