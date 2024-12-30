import React from 'react';
import Sidebar from './Sidebar';
import DoubHome from './DoubHome';
import Header from './Header';

function MessageHomePage() {
  return (
    <div>
        <div>
          <Header/>
        </div>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-1 flex justify-center items-center p-6">
          <DoubHome />
        </div>
      </div>
    </div>
  );
}

export default MessageHomePage;
