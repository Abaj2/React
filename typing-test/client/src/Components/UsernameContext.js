import React, { createContext, useState, useContext, useEffect } from 'react';

export const UsernameContext = createContext(null);

export const UsernameProvider = ({ children }) => {
  const [finalUsername, setFinalUsername] = useState(localStorage.getItem("finalUsername") || "");

  useEffect(() => {
    // Sync finalUsername with localStorage
    localStorage.setItem("finalUsername", finalUsername);
  }, [finalUsername]);

  return (
    <UsernameContext.Provider value={{ finalUsername, setFinalUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => useContext(UsernameContext);