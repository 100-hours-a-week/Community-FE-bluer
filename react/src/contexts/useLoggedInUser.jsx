import { useContext } from "react";
import UserContext from "@/contexts/UserContext";

function useLoggedInUser() {
  const userContext = useContext(UserContext);

  return {
    user: userContext.userInfo,
    isLoading: userContext.isLoading,
  };
}

export default useLoggedInUser;
