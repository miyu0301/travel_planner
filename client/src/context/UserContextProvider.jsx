import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkLocalStorageUserId = () => {
      const user_id = localStorage.getItem("user_id");
      setUserId(user_id);
      setLoading(false);
    };
    checkLocalStorageUserId();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
