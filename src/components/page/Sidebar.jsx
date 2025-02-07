import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatCon from './ChatCon';
import { isAuthTokenContext } from '../context/AuthContext';

function Sidebar() {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext);
  const [searchInput, setSearchInput] = useState('');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const data = JSON.parse(sessionStorage.getItem('user'));
      setUsername(data.username);
      setProfilePic(data.profilePicture);
    }
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsAuthToken(false);
    navigate('/login');
  };

  return (
    <div className="w-full sm:w-64 min-h-screen bg-gray-800 p-6 flex flex-col shadow-lg rounded-xl">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={profilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-500 shadow-md hover:scale-105 transition-transform duration-200"
        />
        <div>
          <h2 className="text-xl font-medium text-white">{username}</h2>
          <p className="text-sm text-gray-400">Active now</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearch}
          className="w-full p-3 pl-6 pr-12 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition duration-200">
          <i className="fa-solid fa-search text-xl"></i>
        </button>
      </div>

      {/* Chat Section */}
      <div className="flex-1 overflow-auto space-y-4">
        <ChatCon searchInput={searchInput} />
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full sm:w-75 p-2 text-base font-semibold mt-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
