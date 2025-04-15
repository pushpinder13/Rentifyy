import React from 'react'
import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateListing from './pages/CreateListing'

function App() {
  

  return (
    <BrowserRouter>
    <div className="text-[#404040] bg-[#f9f9f9]">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register/> } />
      <Route path="/login" element={<Login/> } />
      <Route path='/create-listing' element={<CreateListing/>} />
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
