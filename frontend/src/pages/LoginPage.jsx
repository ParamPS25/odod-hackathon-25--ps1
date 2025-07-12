import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  // Get login function and loading state from Zustand store
  const { login, isLoggingIn } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Call login function from Zustand store
      await login(formData, navigate);
      // Navigation will be handled by the store on successful login
    } catch (error) {
      // Error handling is done in the store
      console.error('Login error:', error);
    }
  };

  const handleForgotUsername = () => {
    alert('Forgot Username functionality would be implemented here');
  };

  const handleForgotPassword = () => {
    alert('Forgot Password functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-200/50">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your skill journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoggingIn}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoggingIn}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${
                isLoggingIn 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              }`}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Forgot Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={handleForgotUsername}
                disabled={isLoggingIn}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200 disabled:opacity-50"
              >
                Forgot Username?
              </button>
              <span className="hidden sm:block text-gray-400">•</span>
              <button 
                onClick={handleForgotPassword}
                disabled={isLoggingIn}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200 disabled:opacity-50"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/signUpPage')}
              disabled={isLoggingIn}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200 disabled:opacity-50"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;