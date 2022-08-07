import { createContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutService } from '../../services/auth-service';

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  isAdmin: false,
  login: (data) => { },
  logout: () => { }
});

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const userIsLoggedIn = !!userId;
  const navigate = useNavigate();

  const loginHandler = useCallback((user) => {
    setIsLoggedIn(!!user);
    setUsername(user.username);
    setUserId(user._id);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
  }, []);

  const logoutHandler = useCallback(() => {
    logoutService().then(() => {
      setIsLoggedIn(false);
      setUserId(null);
      setIsAdmin(false);
      setUsername(null);
      setEmail(null);
      navigate('/login');
      return null;
    });
  }, []);


  const contextValue = {
    username,
    userId,
    email,
    isAdmin,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  console.log(
    username,
    userId,
    email,
    isAdmin,
    userIsLoggedIn)

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>;
};

export default AuthContext;
