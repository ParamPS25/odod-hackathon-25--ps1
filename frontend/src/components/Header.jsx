import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Header = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  const isLoggedIn = !!authUser;

  const handleLogin = () => {
    navigate('/loginPage');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/UserProfile');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand Section */}
          <div className="cursor-pointer" onClick={handleHomeClick}>
            <h1 className="text-xl font-semibold text-gray-800 mb-1">
              Skill Swap Platform
            </h1>
            <h2 className="text-sm text-gray-600">
              Exchange skills, grow together
            </h2>
          </div>

          {/* Navigation and Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-medium text-gray-800">
                    {authUser.username || authUser.name || authUser.email}
                  </span>
                </div>
                
                {/* Profile Button */}
                <button
                  onClick={handleProfileClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Profile
                </button>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  className="bg-white border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Login
                </button>
                
                {/* Sign Up Button */}
                <button
                  onClick={() => navigate('/signUpPage')}
                  className="bg-teal-400 text-white px-6 py-2 rounded-full hover:bg-teal-500 transition-colors duration-200 font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;