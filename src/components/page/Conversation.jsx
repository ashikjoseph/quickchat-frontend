import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getAPI, senderAPI } from '../services/allAPI';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/Socket';
import { messageContext } from '../context/AuthContext';
import EmojiPicker from 'emoji-picker-react';
import { emojify } from 'react-emoji';
import notification from '../assets/happy-pop-2-185287.mp3';
import Sidebar from './Sidebar';
import { useConversationContext } from '../context/ConversationContext';
import Header from './Header';

function Conversation() {
  const { onlineUsers } = useSocketContext();
  const { fullname, profilePicture } = useConversationContext();
  const { contactId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const lastMsgRef = useRef(null);
  const inputRef = useRef(null);
  const messageContainerRef = useRef(null);
  const { socket } = useSocketContext();
  const { setAddMessages } = useContext(messageContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showScrollUpArrow, setShowScrollUpArrow] = useState(false);
  const [messageShakeMap, setMessageShakeMap] = useState({});
  const audioRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      toast.error('Message cannot be empty');
      return;
    }

    await sendMessage(newMessage);
    setNewMessage('');
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  useEffect(() => {
    const handleMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageShakeMap((prevShakeMap) => {
        return { ...prevShakeMap, [newMessage.id]: true };
      });
      audioRef.current.play();
    };

    if (socket) {
      socket.on('newMessage', handleMessage);
    }

    return () => {
      if (socket) {
        socket.off('newMessage', handleMessage);
      }
    };
  }, [socket, setAddMessages]);

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const response = await getAPI(contactId, reqHeader);
        const deletedMessages = JSON.parse(localStorage.getItem('deletedMessages')) || [];
        const filteredMessages = response.data.filter(
          (message) => !deletedMessages.includes(message._id)
        );
        setMessages(
          filteredMessages.map((message) => ({
            ...message,
            message: emojify(message.message),
          }))
        );
      } catch (err) {
        toast.error('Error fetching messages', err);
      }
    };

    if (contactId) fetchMessages();
  }, [contactId]);

  const sendMessage = async (message) => {
    try {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await senderAPI(contactId, { message }, reqHeader);
      setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (err) {
      toast.error('Error sending message:', err);
    }
  };

  const isOnline = onlineUsers.includes(contactId);

  const handleScroll = () => {
    if (messageContainerRef.current.scrollTop > 0) {
      setShowScrollUpArrow(true);
    } else {
      setShowScrollUpArrow(false);
    }
  };

  const scrollToTop = () => {
    messageContainerRef.current.scrollTop = 0;
    setShowScrollUpArrow(false);
  };

  // Function to group messages by date
  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const dateString = messageDate.toLocaleDateString(); // Format: MM/DD/YYYY

      if (!groupedMessages[dateString]) {
        groupedMessages[dateString] = [];
      }

      groupedMessages[dateString].push(message);
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className='flex'>
        <div className='w-1/5 bg-gray-800 p-4'>
          <Sidebar />
        </div>
        <div className='flex-1 bg-white p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              {profilePicture && (
                <img
                  src={profilePicture}
                  alt='Profile'
                  className='w-12 h-12 rounded-full object-cover border-2 border-blue-400'
                />
              )}
              <h2 className='ml-4 text-xl font-semibold'>{fullname}</h2>
            </div>
            {isOnline ? (
              <span className='text-green-500'>Online</span>
            ) : (
              <span className='text-red-500'>Offline</span>
            )}
          </div>
          {messages.length === 0 && (
            <h6 className='text-center text-gray-500'>Start new conversation</h6>
          )}
          <div
            className='h-96 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg'
            ref={messageContainerRef}
            onScroll={handleScroll}
          >
            {Object.keys(groupedMessages).map((date, index) => (
              <div key={date}>
                <div className='text-center text-gray-500 my-4'>{date}</div>
                {groupedMessages[date].map((message, index) => (
                  <div
                    key={index}
                    ref={index === messages.length - 1 ? lastMsgRef : null}
                    className={`flex items-start mb-4 ${message.senderId === contactId ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-xs ${message.senderId === contactId
                        ? 'bg-gray-300 text-black'
                        : 'bg-blue-500 text-white'
                        }`}
                    >
                      <span className='font-semibold'>
                        {message.senderId === contactId ? '' : 'You:'}
                      </span>{' '}
                      {message.message}
                    </div>
                    <div
                      className={`text-sm mt-1 ${message.senderId === contactId ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                      {formatMessageTime(new Date(message.createdAt))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {showScrollUpArrow && (
            <button
              className='absolute bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-400 mb-6'
              onClick={scrollToTop}
            >
              ↑
            </button>
          )}
          <div className='flex items-center'>
            <input
              type='text'
              ref={inputRef}
              placeholder='Type your message here'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className='flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              className='p-3 ml-2 text-2xl text-gray-500 hover:text-gray-700'
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              ☺️
            </button>
            <button
              className='p-3 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400'
              onClick={handleSubmit}
            >
              <i className='fa-solid fa-paper-plane'></i>
            </button>
          </div>
          {showEmojiPicker && (
            <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2'>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <audio ref={audioRef} src={notification} preload='auto' />
        </div>
      </div>
    </div>
  );
}

function formatMessageTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

export default Conversation;
