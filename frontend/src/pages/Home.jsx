
import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
import toast from 'react-hot-toast';
import GridBg from '../components/GridBg';
import { useNavigate } from 'react-router-dom';
import SwapRequest from './SwapRequest';
import Header from '../components/Header';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Move useNavigate to component level

  const users = [
    {
      id: 1,
      name: "Marc Demo",
      profilePhoto: null,
      skillsOffered: ["Data Science", "Python"],
      skillsWanted: ["UI/UX", "Graphic Design"],
      rating: 3.4,
      maxRating: 5
    },
    {
      id: 2,
      name: "Michell",
      profilePhoto: null,
      skillsOffered: ["Data Science", "Python"],
      skillsWanted: ["UI/UX", "Graphic Design"],
      rating: 2.5,
      maxRating: 5
    },
    {
      id: 3,
      name: "Joe wills",
      profilePhoto: null,
      skillsOffered: ["Data Science", "Python"],
      skillsWanted: ["UI/UX", "Graphic Design"],
      rating: 4.0,
      maxRating: 5
    }
  ];

  const totalPages = 7;

  const handleRequest = (userName) => {
    if (!isLoggedIn) {
      toast.error("Please login to make a request");
      return;
    }
    toast.success(`Request sent to ${userName}!`);
    navigate('/SwapRequest'); // Use navigate function here
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderStars = (rating, maxRating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const emptyStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }
    
    return stars;
  };

  const UserCard = ({ user }) => (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6 mb-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">

          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-400">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-500" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{user.name}</h3>
            
            <div className="mb-3">
              <span className="text-sm text-green-600 font-medium">Skills Offered → </span>
              <div className="inline-flex flex-wrap gap-1 mt-1">
                {user.skillsOffered.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-sm text-blue-600 font-medium">Skill wanted → </span>
              <div className="inline-flex flex-wrap gap-1 mt-1">
                {user.skillsWanted.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <button 
            onClick={() => handleRequest(user.name)}
            className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2 rounded-lg font-medium transition-colors mb-2"
          >
            Request
          </button>
          <div className="text-sm text-gray-600">
            <span>rating </span>
            <span className="font-semibold">{user.rating}/{user.maxRating}</span>
            <div className="flex justify-end mt-1">
              {renderStars(user.rating, user.maxRating)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <GridBg>
    {/* <div className="min-h-screen bg-gray-50"> */}
      {/* Header */}
      {/* <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800 mb-1">Home page</h1>
              <h2 className="text-lg text-gray-700">Skill Swap Platform</h2>
            </div>
            <div>
              {!isLoggedIn ? (
                <button 
                  onClick={handleLogin}
                  className="bg-white border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Login
                </button>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="bg-teal-400 text-white px-6 py-2 rounded-full hover:bg-teal-500 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div> */}
<Header/>
      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto px-4 py-6 my-12">
        <div className="flex items-center gap-4 mb-6">
          <select 
            value={availability} 
            onChange={(e) => setAvailability(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white"
          >
            <option>Availability</option>
            <option>weekends</option>
            <option>weekdays</option>
            <option>anytime</option>
            <option>unAvailable</option>
          </select>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm transition-colors">
              search
            </button>
          </div>
        </div>

        {/* Note about login requirement */}
        {!isLoggedIn && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Should not be able to request without login</strong>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              If not login then not able to do Request (show a quick help/popup popup)
            </p>
          </div>
        )}

        {/* User Cards */}
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-8 space-x-2">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-md ${
                currentPage === page 
                  ? 'bg-teal-400 text-white' 
                  : 'hover:bg-gray-100 text-white'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
         </div>
    {/* </div> */}
    </GridBg>
  );
};

export default Home;