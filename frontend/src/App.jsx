import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import SwapRequest from './pages/SwapRequest.jsx'
import { Toaster } from 'react-hot-toast'
import GridBg from './components/GridBg.jsx'
import LoginPage from './pages/LoginPage.jsx'
function App() {
  return (
    <Router>
      
      <Toaster />
      <Routes>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/swapRequest" element={<SwapRequest />} />
      </Routes>
    </Router>
  )
}

export default App