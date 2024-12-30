import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/AuthContext';

function DoubHome() {
  const navigate = useNavigate();
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsAuthToken(false);
    navigate('/');
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-teal-100 via-blue-200 to-purple-300 flex flex-col justify-center items-center">
      <main className="w-full max-w-3xl p-6 md:p-12 bg-white rounded-xl shadow-lg space-y-8">
        <section className="flex flex-col items-center justify-center space-y-6">
          {/* Home Icon */}
          <div className="text-center">
            <Link to={'/'}>
              <i className="fa-solid fa-house-chimney-user fa-4x text-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:text-white transition-all"></i>
            </Link>
          </div>

          {/* Text and Logout Button */}
          <div className="flex flex-col items-center text-center space-y-6">
            <p className="text-xl md:text-2xl text-gray-700 font-semibold">
              Your space to talk, laugh, and stay connected!
            </p>
            <div className="text-center">
              <button
                className="bg-indigo-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-indigo-500 focus:outline-none transform transition-all duration-200 hover:scale-105"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoubHome;
