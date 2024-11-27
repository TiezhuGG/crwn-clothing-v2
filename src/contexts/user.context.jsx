import { createContext, useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrnetUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrnetUser] = useState(null);
  const value = {
    currentUser,
    setCurrnetUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log(user);

      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrnetUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
