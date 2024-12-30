import { Route, Routes } from 'react-router-dom';

import Home from './components/main/Home';
import Msg from './components/page/Msg'

import toast, { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { isAuthTokenContext } from './components/context/AuthContext';
import Conversation from './components/page/Conversation';
import Auth from './components/page/Auth';

function App() {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  useEffect(() => {
    const tsn = sessionStorage.getItem('token')
    if (tsn) {
      setIsAuthToken(tsn)
    }
  }, [isAuthToken])
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Auth register="register" />} /> {/* Register route */}
        <Route path='/login' element={<Auth/>} /> {/* Login route */}
        <Route path='/msg' element={<Msg />} />
        <Route path='/conversation/:contactId' element={<Conversation />} />

      </Routes>
      <Toaster />
    </>
  );
}

export default App;
