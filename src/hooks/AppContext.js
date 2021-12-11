import { onAuthStateChanged } from "@firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import auth from "../firebase.config";

const AppCreateContext = React.createContext();

const AppContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const unSubAuthStateChanged = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unSubAuthStateChanged();
    };
  }, []);

  const contextValue = {
    currentUser,
    setCurrentUser,
    update,
    setUpdate,
    notificationList,
    setNotificationList,
    showNotification,
    setShowNotification,
  };

  return (
    <AppCreateContext.Provider value={contextValue}>
      {children}
    </AppCreateContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppCreateContext);
};

export default AppContext;
