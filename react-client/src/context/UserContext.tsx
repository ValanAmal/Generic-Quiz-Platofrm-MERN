// Create a context for managing user roles (in context/UserContext.tsx)
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
  children: ReactNode; // Declare that 'children' is expected as a prop
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Initial state, default is not admin

  return (
    <UserContext.Provider value={{ isAdmin, setAdmin: setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
