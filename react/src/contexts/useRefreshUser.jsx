import { useContext } from "react";
import UserContext from "@/contexts/UserContext";

function useRefreshUser() {
  const userContext = useContext(UserContext);

  return { refreshUserInfo: userContext.refreshUserInfo };
}

export default useRefreshUser;
