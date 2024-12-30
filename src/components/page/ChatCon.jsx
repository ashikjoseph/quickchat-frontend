import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { conversationAPI } from '../services/allAPI';
import toast from 'react-hot-toast';
import { addCnversationsContext } from '../context/AuthContext';
import { useConversationContext } from '../context/ConversationContext';
import { useSocketContext } from '../context/Socket';


function ChatCon({ searchInput }) {
  const [contacts, setContacts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { addConversations } = useContext(addCnversationsContext);
  const { setFullname, setProfilePicture } = useConversationContext();
  const { onlineUsers } = useSocketContext(); 
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  useEffect(() => {
    getConversations();
  }, [addConversations]);

  const getConversations = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await conversationAPI(reqHeader);
      setContacts(result.data);
    } catch (err) {
      toast.error(`Error fetching conversations: ${err.message}`);
    }
  };

  const handleSelect = (item) => {
    setFullname(item.fullname);
    setProfilePicture(item.profilePicture);
    setSelectedUserId(item._id);
  };

  const handleFavorite = (contactId) => {
    let updatedFavorites;
    if (favorites.includes(contactId)) {
      updatedFavorites = favorites.filter(id => id !== contactId);
    } else {
      updatedFavorites = [...favorites, contactId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.username?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const pinnedContacts = filteredContacts.filter((contact) => favorites.includes(contact._id));
  const remainingContacts = filteredContacts.filter((contact) => !favorites.includes(contact._id));
  const sortedContacts = [...pinnedContacts, ...remainingContacts];

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {sortedContacts.length > 0 ? (
          sortedContacts.map((item, index) => (
            <li key={item._id} className="flex justify-between items-center">
              <Link
                to={`/conversation/${item._id}`}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ease-in-out ${
                  selectedUserId === item._id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-black'
                }`}
                onClick={() => handleSelect(item)}
              >
                <div className="relative">
                  <img
                    src={item.profilePicture || 'https://via.placeholder.com/150'}
                    alt={`Profile Pic ${index + 1}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                  />
                  {/* Online/Offline Indicator */}
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      onlineUsers.includes(item._id) ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    title={onlineUsers.includes(item._id) ? 'Online' : 'Offline'}
                  ></span>
                </div>
                <div className="text-lg font-semibold">{item.fullname}</div>
              </Link>
              <Button
                className={`bg-transparent border-0 ${
                  favorites.includes(item._id)
                    ? 'text-yellow-400 hover:text-yellow-500'
                    : 'text-gray-400 hover:text-gray-500'
                }`}
                onClick={() => handleFavorite(item._id)}
                aria-label="Pin Contact"
              >
                <i className="fa-solid fa-thumbtack text-xl"></i>
              </Button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No contacts found</p>
        )}
      </ul>
    </div>
  );
}

export default ChatCon;
