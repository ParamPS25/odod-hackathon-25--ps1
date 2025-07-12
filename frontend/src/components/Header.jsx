import React, { useState } from 'react';
import { Home, User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [activeItem, setActiveItem] = useState('home');
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === 'home') {
      navigate('/');
      console.log('Navigating to home page');
    } else if (item === 'profile') {
      navigate('./UserProfile');
      console.log('Navigating to user profile page');
    }
    console.log(`Clicked: ${item}`);
  };

  const handleLoginClick = () => {
    navigate('/LoginPage');
    console.log('Navigating to login page');
  };

  return (
    <div>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800">Skill Swap PlatForm</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => handleItemClick('home')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeItem === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => handleItemClick('profile')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeItem === 'profile'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <div>
                <button 
                  onClick={handleLoginClick}
                  className="bg-white border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
     
    </div>
  );
};


export default Header;


