import { useState } from "react";
import { useCallback } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { logout as logoutService } from '../../services/auth-service';

import parseCookies from '../util/parse-cookies';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  isAdmin: false,
  login: () => { },
  logout: () => { }
});

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const cookies = parseCookies();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((user) => {
    setIsLoggedIn(!!user);
    setUserId(user._id);
    setIsAdmin(user.isAdmin);
    console.log(cookies['auth-cookie'], isLoggedIn, isAdmin, userId);
    console.log(user);
  }, []);

  const logout = useCallback(() => {
    logoutService().then(() => {
      setIsLoggedIn(false);
      setUserId(null);
      setIsAdmin(false);
      navigate('/login');
      return null;
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userId,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};