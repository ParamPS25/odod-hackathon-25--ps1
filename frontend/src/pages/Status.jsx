import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Header from '../components/Header';
const Status = () => {
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');

  const swapRequests = [
    {
      id: 1,
      name: 'Marc Demo',
      profilePhoto: '/api/placeholder/60/60',
      rating: 3.9,
      skillsOffered: ['Java Script'],
      skillsWanted: ['Database'],
      status: 'Pending'
    },
    {
      id: 2,
      name: 'name',
      profilePhoto: '/api/placeholder/60/60',
      rating: 3.9,
      skillsOffered: [],
      skillsWanted: [],
      status: 'Rejected'
    }
  ];

  const filteredRequests = swapRequests.filter(request => 
    request.status === selectedStatus &&
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccept = (id) => {
    console.log('Accepted request:', id);
  };

  const handleReject = (id) => {
    console.log('Rejected request:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-900">Skill Swap Platform</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 border-b-2 border-gray-900 pb-1">
              Home
            </button>
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div> */}

<Header/>
      {/* Screen Title */}
      <div className="px-6 py-16">
        <h2 className="text-lg font-medium text-gray-800">Screen 6</h2>
        <p className="text-sm text-gray-600 mt-1">Swap request</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="px-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90" />
          </div>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm">
              search
            </button>
          </div>
        </div>
      </div>

      {/* Swap Requests List */}
      <div className="px-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {filteredRequests.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No requests found for {selectedStatus.toLowerCase()} status.
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="border-b border-gray-200 last:border-b-0 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded px-2 py-1 text-xs font-medium text-gray-600 border">
                        {request.rating}/5
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">{request.name}</h3>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600">Skills Offered =&gt;</span>
                          {request.skillsOffered.map((skill, index) => (
                            <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-blue-600">Skill wanted =&gt;</span>
                          {request.skillsWanted.map((skill, index) => (
                            <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Status</span>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    
                    {request.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          <button className="p-2 rounded hover:bg-gray-100">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded font-medium">1</button>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">2</button>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">3</button>
          <button className="p-2 rounded hover:bg-gray-100">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Status;