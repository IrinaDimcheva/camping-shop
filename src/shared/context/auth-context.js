import { useState } from "react";
import { useCallback } from "react";
import { createContext } from "react";

import parseCookies from '../util/parse-cookies';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  isAdmin: false,
  login: () => { },
  logout: () => { }
});

export const AuthContextProvider = ({ children }) => {
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
    setIsLoggedIn(false);
    setUserId(null);
    setIsAdmin(false);
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