import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const SwapRequest = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('User not found or unauthorized');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleRatingClick = (value) => setRating(value);

  const handleSubmitFeedback = () => {
    if (rating === 0) return alert('Please select a rating');

    alert(`Feedback submitted: ${rating} stars${feedback ? ` - ${feedback}` : ''}`);

    // Reset form
    setRating(0);
    setFeedback('');
  };

  const renderStars = (interactive = false) =>
    [...Array(5)].map((_, i) => (
      <button
        key={i}
        onClick={() => interactive && handleRatingClick(i + 1)}
        className={`text-2xl ${i + 1 <= rating ? 'text-yellow-400' : 'text-gray-300'} ${
          interactive ? 'hover:text-yellow-400 cursor-pointer' : ''
        }`}
        disabled={!interactive}
      >
        ★
      </button>
    ));

  if (loading) return <div className="p-10 text-center text-gray-500">Loading user...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-purple-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">

          {/* Request Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(`/skillExchangeForm/${user._id}`)}
              className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Request
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1 pr-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {user.name || user.username || 'User'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {(user.skillsOffered || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium border border-green-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills Wanted</h3>
                  <div className="flex flex-wrap gap-2">
                    {(user.skillsWanted || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {user.availability && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-1">Availability</h3>
                      <p className="text-gray-600 text-sm">{user.availability}</p>
                    </div>
                  )}
                  {user.location && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-1">Location</h3>
                      <p className="text-gray-600 text-sm">{user.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Profile Photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Rating and Feedback
            </h3>

            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  How was your experience with {user.name || user.username}?
                </p>
                <div className="flex justify-center space-x-1 mb-4">{renderStars(true)}</div>
                {rating > 0 && (
                  <p className="text-sm text-gray-600">
                    You selected {rating} star{rating !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Feedback (Optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={4}
                  placeholder="Share your experience working with this person..."
                />
              </div>

              <button
                onClick={handleSubmitFeedback}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapRequest;
