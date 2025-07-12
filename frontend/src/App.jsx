import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import SwapRequest from './pages/SwapRequest.jsx'
import { Toaster } from 'react-hot-toast'
import GridBg from './components/GridBg.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SkillsExchangeForm from './pages/SkillExchangeForm.jsx'
function App() {
  return (
    <Router>
      
      <Toaster />
      <Routes>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/swapRequest" element={<SwapRequest />} />
        <Route path="/SkillExchangeForm" element={<SkillsExchangeForm />} />
      </Routes>
    </Router>
  )
}

export default App