import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] h-screen w-screen bg-no-repeat bg-cover overflow-hidden'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
