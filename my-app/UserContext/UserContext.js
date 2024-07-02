import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserIdContext = createContext(null);

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  console.log(userId);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId !== null) {
          const parsedUserId = JSON.parse(storedUserId);
          const idValue = parsedUserId.id;
          setUserId(idValue);
        }
      } catch (error) {
        console.error('Error loading userId from AsyncStorage:', error);
      }
    };
    loadUserId();
  }, []);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => useContext(UserIdContext);
