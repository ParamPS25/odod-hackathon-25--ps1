import React, { useState } from 'react';
import { User, Mail, MapPin, Clock, Eye, Shield, Calendar, Settings, Edit3, Check, X } from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "John Smith",
    email: "john.smith@example.com",
    role: "user",
    gender: "male",
    location: "New York, USA",
    avatar: "https://res.cloudinary.com/dgdqt0m8f/image/upload/v1749210579/bagewwl8rsjibdlz8onx.webp",
    skillsOffered: ["JavaScript", "React", "Node.js", "MongoDB"],
    skillsWanted: ["Python", "Machine Learning", "AWS", "Docker"],
    availibility: "anytime",
    profileVisibility: "public",
    isUserBanned: false,
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-07-12T14:20:00Z"
  });

  const [editData, setEditData] = useState({...userData});

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({...userData});
  };

  const handleSave = () => {
    setUserData({...editData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({...userData});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({...prev, [field]: value}));
  };

  const handleSkillsChange = (type, value) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setEditData(prev => ({...prev, [type]: skills}));
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getAvailabilityColor = (availability) => {
    const colors = {
      'weekdays': 'bg-green-100 text-green-800',
      'weekends': 'bg-yellow-100 text-yellow-800',
      'anytime': 'bg-blue-100 text-blue-800',
      'unavailable': 'bg-red-100 text-red-800'
    };
    return colors[availability] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {userData.isUserBanned && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <X className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-blue-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">{userData.username}</h2>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(userData.role)}`}>
                    {userData.role}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span>{userData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span>{userData.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 w-[900px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  {isEditing ? (
                    <select
                      value={editData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 capitalize">{userData.gender}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  {isEditing ? (
                    <select
                      value={editData.availibility}
                      onChange={(e) => handleInputChange('availibility', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="anytime">Anytime</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(userData.availibility)}`}>
                      <Clock className="w-3 h-3 mr-1" />
                      {userData.availibility}
                    </span>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Visibility</label>
                  {isEditing ? (
                    <select
                      value={editData.profileVisibility}
                      onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900 capitalize">{userData.profileVisibility}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userData.isUserBanned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {userData.isUserBanned ? 'Banned' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-[900px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills Offered</label>
                  {isEditing ? (
                    <textarea
                      value={editData.skillsOffered.join(', ')}
                      onChange={(e) => handleSkillsChange('skillsOffered', e.target.value)}
                      placeholder="Enter skills separated by commas"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {userData.skillsOffered.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills Wanted</label>
                  {isEditing ? (
                    <textarea
                      value={editData.skillsWanted.join(', ')}
                      onChange={(e) => handleSkillsChange('skillsWanted', e.target.value)}
                      placeholder="Enter skills separated by commas"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {userData.skillsWanted.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* System Information Sidebar */}
          {/* <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                  <p className="text-gray-900 font-mono text-sm">{userData.ipAddress}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Agent</label>
                  <p className="text-gray-900 text-sm break-all">{userData.userAgent.substring(0, 80)}...</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 text-sm">{formatDate(userData.createdAt)}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 text-sm">{formatDate(userData.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;