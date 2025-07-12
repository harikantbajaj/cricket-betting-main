import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { currentUser as initialUser } from '../data/mockData';

interface UserContextType {
  user: User;
  updateUser: (updatedUser: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};