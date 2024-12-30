import React from 'react';
import authImage from '../assets/homeimg.jpg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 text-center shadow-lg rounded-b-3xl mb-12">
        <h1 className="text-5xl font-bold mb-6 tracking-wide text-shadow-md">
          Welcome to QuickChat!
        </h1>
        <p className="text-xl mb-8 px-6 md:px-0 font-medium opacity-90">
          Chat with friends, make new connections, and have fun!
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Join the Fun
        </Link>
      </header>

      {/* Main Content */}
      <main className="py-16 px-6 md:px-16 lg:px-32 text-center">
        <div className="flex items-center justify-center space-x-12 mb-16 bg-white p-8 rounded-lg shadow-xl max-w-6xl mx-auto transition duration-300 transform hover:scale-105">
          {/* Image on the left */}
          <img
            src={authImage}
            alt="QuickChat Signup"
            className="w-80 h-80 md:w-96 md:h-96 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          />
          {/* Text content on the right */}
          <div className="text-left">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6 leading-tight text-shadow-md">
              What is QuickChat?
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mb-10 leading-relaxed font-light">
              QuickChat is the place to be for instant fun chats with people from around the world. Whether you're
              laughing, chatting, or making new friends, QuickChat makes every conversation exciting!
            </p>
            <div className="mt-8">
              <p className="text-gray-700 text-lg">
                Sign up and start chatting today!{' '}
                <span>
                  <Link
                    to={'/register'}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition duration-300"
                  >
                    Create Your Account
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="my-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Why Choose QuickChat?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Instant Messaging</h3>
              <p className="text-gray-600">
                Send and receive messages instantly, no delays, no hassle!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your chats are secure and private. We value your privacy!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Connect Globally</h3>
              <p className="text-gray-600">
                Meet new friends from all around the world with a single click.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="my-16 bg-gray-100 py-12 rounded-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
              <p className="text-gray-600 italic mb-4">
                "QuickChat is amazing! I've made so many new friends here. Highly recommend!"
              </p>
              <p className="font-semibold text-gray-800">— Niya John</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
              <p className="text-gray-600 italic mb-4">
                "A fun and easy way to chat. Love the features and the community!"
              </p>
              <p className="font-semibold text-gray-800">— Sidharth Menon</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-12 shadow-inner">
        <p className="text-gray-100 text-sm hover:text-blue-500 transition duration-300">
          &copy; 2024 QuickChat. All rights reserved. Let's chat and have fun!
        </p>
      </footer>
    </div>
  );
}

export default Home;
