import { createContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutService } from '../../services/auth-service';

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  isAdmin: false,
  cartCount: 0,
  login: (user) => { },
  logout: () => { },
});

export const AuthContextProvider = props => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const loginHandler = useCallback((user) => {
    setUser(user);
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
  }, [navigate]);


  const contextValue = {
    username,
    userId,
    email,
    isAdmin,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  // console.log(
  //   user
  // )

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>;
};

export default AuthContext;
