import React, { createContext, useState, useContext } from 'react';

// Create the context
const ConversationContext = createContext();

// Create a provider component
export const ConversationProvider = ({ children }) => {
  const [fullname, setFullname] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  return (
    <ConversationContext.Provider value={{ fullname, setFullname, profilePicture, setProfilePicture }}>
      {children}
    </ConversationContext.Provider>
  );
};

// Custom hook to use the context
export const useConversationContext = () => {
  return useContext(ConversationContext);
};
