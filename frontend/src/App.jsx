import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuthStore } from './store/useAuthStore.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/home.jsx';
import SwapRequest from './pages/SwapRequest.jsx';
import SkillsExchangeForm from './pages/SkillExchangeForm.jsx';
import Header from './components/Header.jsx';
import Status from './pages/Status.jsx';
import UserProfile from './pages/UserProfile.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />

        {/* Protected routes */}
        <Route
          path="/swapRequest/:userId"
          element={
            <ProtectedRoute>
              {<SwapRequest />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/SkillExchangeForm/:userId"
          element={
            <ProtectedRoute>
              {<SkillsExchangeForm />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Header"
          element={
            <ProtectedRoute>
              <Header />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
