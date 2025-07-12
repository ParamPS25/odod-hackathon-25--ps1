import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    location: ''
  });

  const [errors, setErrors] = useState({});

  // Get signup function and loading state from Zustand store
  const { signup, isSiginingUp } = useAuthStore();

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
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
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
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    } else if (formData.location.length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Call signup function from Zustand store
      await signup(formData, navigate);
      // Navigation will be handled by the store on successful signup
    } catch (error) {
      // Error handling is done in the store
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-md">
        {/* Sign Up Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-8 border border-gray-200/50">
          {/* Welcome Section */}
          <div className="text-center mb-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600 pb-1.5">Join us and start your skill journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isSiginingUp}
                className={`w-full px-2 py-1.5 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.username 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

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
                disabled={isSiginingUp}
                className={`w-full px-2 py-1.5 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
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
                disabled={isSiginingUp}
                className={`w-full px-2 py-1.5 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                placeholder="Create a strong password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Gender Selection */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={isSiginingUp}
                className={`w-full px-2 py-1.5 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.gender 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            {/* Location Input */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={isSiginingUp}
                className={`w-full px-2 py-1.5 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.location 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                placeholder="Enter your city or location"
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isSiginingUp}
              className={`w-full py-2 rounded-xl font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${
                isSiginingUp 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              }`}
            >
              {isSiginingUp ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/loginPage')}
              disabled={isSiginingUp}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200 disabled:opacity-50"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;