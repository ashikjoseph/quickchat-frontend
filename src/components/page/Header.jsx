import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/AuthContext';
import { HiChevronDown } from 'react-icons/hi'; // Importing the arrow icon

function Header() {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown
  const dropdownRef = useRef(null); // Reference for dropdown menu

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setUsername(user.username);
      setProfilePic(user.profilePicture);
    }
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside); // Clean up the event listener
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsAuthToken(false);
    navigate('/login');
  };

  // Toggle dropdown state
  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the document
    setDropdownOpen(!dropdownOpen); // Toggle dropdown
  };

  return (
    <div className="flex justify-between items-center p-3 bg-gray-100 shadow-md h-18 sm:h-20 md:h-24">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">QuickChat</h1>
        <h2 className="text-sm sm:text-xl text-gray-600 mb-1 ms-1">Welcome, {username}</h2>
      </div>
      <div className="flex items-center relative">
        <img
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4 cursor-pointer"
          onClick={toggleDropdown} // Toggle dropdown on profile picture click
        />
        {/* Arrow icon for dropdown toggle */}
        <HiChevronDown
          className={`text-xl cursor-pointer ${dropdownOpen ? 'transform rotate-180' : ''}`}
          onClick={toggleDropdown} // Toggle dropdown
        />
        {dropdownOpen && (
          <div
            ref={dropdownRef} // Attach ref to the dropdown menu
            className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-48 sm:w-56"
          >
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-gray-700 text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
