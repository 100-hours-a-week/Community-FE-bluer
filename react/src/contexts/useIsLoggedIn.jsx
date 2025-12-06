import { useContext } from "react";
import UserContext from "@/contexts/UserContext";

function useIsLoggedIn() {
  const userContext = useContext(UserContext);
  return !!userContext.userInfo;
}

export default useIsLoggedIn;
