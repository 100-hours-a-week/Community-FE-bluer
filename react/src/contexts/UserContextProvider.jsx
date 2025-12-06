import { useState, useEffect } from "react";
import UserContext from "@/contexts/userContext";
import { apiManager } from "@/lib/api/apiManager";

function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearUserInfo = () => {
    setUserInfo(null);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await apiManager.getUserProfile();
        const { id, email, nickname, profileImageUrl } = data;

        setUserInfo({ userId: id, email, nickname, profileImageUrl });

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        clearUserInfo();
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, clearUserInfo, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
