import React, { useState, useEffect } from 'react';
import { Users, Handshake, Clock, Ban, Settings, MessageSquare, Eye, Check, X, Send, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 156,
    bannedUsers: 5
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', skills: ['Photoshop', 'Web Design'], location: 'New York', status: 'active' },
    { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', skills: ['Excel', 'Data Analysis'], location: 'California', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', skills: ['Guitar', 'Music Theory'], location: 'Texas', status: 'active' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', skills: ['Cooking', 'Baking'], location: 'Florida', status: 'active' },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', skills: ['Programming', 'Web Dev'], location: 'Chicago', status: 'banned' },
    { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', skills: ['Design', 'Graphics'], location: 'Miami', status: 'banned' }
  ]);

  const [swaps, setSwaps] = useState([
    { id: 1, from: 'John', to: 'Sarah', skill1: 'Photoshop', skill2: 'Excel', status: 'pending' },
    { id: 2, from: 'Mike', to: 'Emma', skill1: 'Guitar', skill2: 'Cooking', status: 'accepted' },
    { id: 3, from: 'Alex', to: 'Lisa', skill1: 'Programming', skill2: 'Design', status: 'rejected' },
    { id: 4, from: 'John', to: 'Mike', skill1: 'Design', skill2: 'Music', status: 'accepted' },
    { id: 5, from: 'Sarah', to: 'Emma', skill1: 'Data Analysis', skill2: 'Baking', status: 'pending' },
    { id: 6, from: 'Lisa', to: 'Alex', skill1: 'Graphics', skill2: 'Programming', status: 'rejected' },
    { id: 7, from: 'Emma', to: 'John', skill1: 'Cooking', skill2: 'Photoshop', status: 'accepted' },
    { id: 8, from: 'Mike', to: 'Sarah', skill1: 'Guitar', skill2: 'Excel', status: 'pending' },
    { id: 9, from: 'Alex', to: 'Emma', skill1: 'Programming', skill2: 'Baking', status: 'rejected' }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-refresh stats every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate stats updates
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, number, label, color }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-3xl font-bold text-gray-900 mb-1">{number}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
        <div className={`p-3 rounded-xl ${color} shadow-sm`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const UserModal = () => (
    showUserModal && selectedUser && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {getInitials(selectedUser.name)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedUser.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.status === 'active' ? 'Active' : 'Banned'}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Location</p>
                  <p className="text-gray-900">{selectedUser.location}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    if (selectedUser.status === 'active') {
                      handleBanUser(selectedUser.id);
                    } else {
                      handleUnbanUser(selectedUser.id);
                    }
                  }}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    selectedUser.status === 'active' 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {selectedUser.status === 'active' ? (
                    <>
                      <Ban className="w-4 h-4" />
                      Ban User
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Unban User
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleBanUser = (userId) => {
    if (window.confirm('Are you sure you want to ban this user?')) {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'banned' } : user
      ));
      setStats(prev => ({ 
        ...prev, 
        totalUsers: prev.totalUsers - 1,
        bannedUsers: prev.bannedUsers + 1
      }));
      alert('User has been banned successfully.');
    }
  };

  const handleUnbanUser = (userId) => {
    if (window.confirm('Are you sure you want to unban this user?')) {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'active' } : user
      ));
      setStats(prev => ({ 
        ...prev, 
        totalUsers: prev.totalUsers + 1,
        bannedUsers: prev.bannedUsers - 1
      }));
      alert('User has been unbanned successfully.');
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Message sent to ${activeUsers.length} users successfully!`);
      setMessage('');
    } else {
      alert('Please enter a message.');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      accepted: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    return `px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const activeUsers = users.filter(user => user.status === 'active');
  const bannedUsers = users.filter(user => user.status === 'banned');
  const pendingSwaps = swaps.filter(swap => swap.status === 'pending');
  const acceptedSwaps = swaps.filter(swap => swap.status === 'accepted');
  const rejectedSwaps = swaps.filter(swap => swap.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, Admin | Skill Swap Platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={Users}
            number={stats.totalUsers}
            label="Total Users"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Ban}
            number={bannedUsers.length}
            label="Banned Users"
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
          <StatCard
            icon={Clock}
            number={pendingSwaps.length}
            label="Pending Swaps"
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          />
          <StatCard
            icon={CheckCircle}
            number={acceptedSwaps.length}
            label="Accepted Swaps"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            icon={XCircle}
            number={rejectedSwaps.length}
            label="Rejected Swaps"
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* User Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  User Management
                </h3>
                <button
                  onClick={() => setShowUserList(!showUserList)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  {showUserList ? 'Hide All Users' : 'View All Users'}
                </button>
              </div>
            </div>
            <div className="p-6">
              {!showUserList ? (
                <div className="space-y-4">
                  {activeUsers.slice(0, 4).map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleBanUser(user.id)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center gap-1"
                        >
                          <Ban className="w-4 h-4" />
                          Ban
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Active Users */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Active Users ({activeUsers.length})
                    </h4>
                    <div className="space-y-3">
                      {activeUsers.map(user => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {getInitials(user.name)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleBanUser(user.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                            >
                              Ban
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Banned Users */}
                  {bannedUsers.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        Banned Users ({bannedUsers.length})
                      </h4>
                      <div className="space-y-3">
                        {bannedUsers.map(user => (
                          <div key={user.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {getInitials(user.name)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewUser(user)}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleUnbanUser(user.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                              >
                                Unban
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Swap Requests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Handshake className="w-5 h-5 text-purple-500" />
                Swap Requests
                <span className="ml-auto text-sm text-gray-500">{swaps.length} total</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {swaps.map(swap => (
                  <div key={swap.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{swap.skill1} ↔ {swap.skill2}</p>
                      <p className="text-sm text-gray-600">{swap.from} → {swap.to}</p>
                    </div>
                    <span className={getStatusBadge(swap.status)}>
                      {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform Messages - Full Width */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              Platform Messages
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to all users
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your platform-wide message here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-gray-500">
                  Will be sent to {activeUsers.length} users
                </p>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <UserModal />
    </div>
  );
};

export default AdminDashboard;