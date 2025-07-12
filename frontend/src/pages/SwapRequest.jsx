import React, { useState } from 'react';
import { Home, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
const SwapRequest = () => {
const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const user = {
    name: "Marc Demo",
    profilePhoto: null,
    skillsOffered: ["Data Science", "Python", "Machine Learning", "Analytics"],
    skillsWanted: ["UI/UX Design", "Graphic Design", "Frontend Development"],
    bio: "Experienced data scientist with 5 years in the field. Looking to expand my design skills to create better data visualizations and user interfaces.",
    availability: "Available weekends and evenings",
    location: "San Francisco, CA"
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    alert(`Feedback submitted: ${rating} stars${feedback ? ` - ${feedback}` : ''}`);
    setRating(0);
    setFeedback('');
  };

  const renderStars = (interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => interactive && handleRatingClick(i)}
          className={`text-2xl ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          } ${interactive ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
          disabled={!interactive}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Skill Swap Platform</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Busy Wolf</span>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex space-x-1">
              <button 
                onClick={() => setActiveTab('swapRequest')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'swapRequest' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Swap request
              </button>
              <Link
  to="/"
  className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
>
  <button
    onClick={() => setActiveTab('home')}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      activeTab === 'home'
        ? 'bg-purple-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    Home
  </button>
</Link>
            </div>
          </div>
        </div>
      </div> */}
<Header/>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          
          {/* Request Button */}
          <div className="mb-6">
            <button onClick={() => navigate('/SkillExchangeForm')} className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Request
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1 pr-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{user.name}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill, index) => (
                      <span 
                        key={index} 
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
                    {user.skillsWanted.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">{user.bio}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Availability</h3>
                    <p className="text-gray-600 text-sm">{user.availability}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Location</h3>
                    <p className="text-gray-600 text-sm">{user.location}</p>
                  </div>
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

          {/* Rating and Feedback Section */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Rating and Feedback</h3>
            
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">How was your experience with {user.name}?</p>
                <div className="flex justify-center space-x-1 mb-4">
                  {renderStars(true)}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-600">You selected {rating} star{rating !== 1 ? 's' : ''}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Feedback (Optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
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