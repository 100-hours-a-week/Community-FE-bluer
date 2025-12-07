import { useContext } from "react";
import UserContext from "@/contexts/UserContext";

function useClearUserContext() {
  const userContext = useContext(UserContext);

  return { clearUserInfo: userContext.clearUserInfo };
}

export default useClearUserContext;
