import { useState, useEffect } from "react";
import UserContext from "@/contexts/userContext";
import { apiManager } from "@/lib/api/apiManager";

function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearUserInfo = () => {
    setUserInfo(null);
  };

  const fetchUserInfo = async () => {
    setIsLoading(true);
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

  const refreshUserInfo = async () => {
    setIsLoading(true);
    await fetchUserInfo();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <UserContext.Provider value={{ userInfo, refreshUserInfo, clearUserInfo, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
