import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
import toast from 'react-hot-toast';
import GridBg from '../components/GridBg';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('All');
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { authUser, logout } = useAuthStore();
  const isLoggedIn = !!authUser;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/users/all', {
          params: {
            page: currentPage,
            limit: 5,
            search: searchTerm,
            availability: availability !== 'All' ? availability : ''
          },
          withCredentials: true
        });

        setUsers(res.data.users);
        setTotalPages(res.data.pages);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm, availability]);

  const handleRequest = (userId) => {
    if (!isLoggedIn) {
      toast.error("Please login to make a request");
      navigate('/loginPage');
      return;
    }

    toast.success(`Request sent!`);
    navigate(`/swapRequest/${userId}`);
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
            onClick={() => handleRequest(user._id)}
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
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-6 my-12">
        {/* Search & Filters */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={availability}
            onChange={(e) => {
              setAvailability(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white"
          >
            <option value="All">Availability</option>
            <option value="weekends">weekends</option>
            <option value="weekdays">weekdays</option>
            <option value="anytime">anytime</option>
            <option value="unAvailable">unAvailable</option>
          </select>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auth Status Info */}
        {!isLoggedIn && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 font-medium">Welcome, Guest! 👋</p>
            <p className="text-sm text-blue-600 mt-1">
              You can browse skills, but need to{' '}
              <button onClick={() => navigate('/loginPage')} className="text-blue-700 underline hover:text-blue-800 font-medium">
                login
              </button>{' '}
              to send requests.
            </p>
          </div>
        )}

        {isLoggedIn && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800 font-medium">Welcome back, {authUser?.name || authUser?.email}! 🎉</p>
            <p className="text-sm text-green-600 mt-1">You can now send skill exchange requests.</p>
          </div>
        )}

        {/* User Cards */}
        {loading && <p className="text-center text-gray-500">Loading users...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {users.length === 0 ? (
              <p className="text-center text-gray-600">No users found.</p>
            ) : (
              users.map((user) => <UserCard key={user._id} user={user} />)
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-md ${currentPage === page
                ? 'bg-teal-400 text-white'
                : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </GridBg>
  );
};

export default Home;
