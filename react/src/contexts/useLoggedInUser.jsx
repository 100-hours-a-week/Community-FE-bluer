import { useContext } from "react";
import UserContext from "@/contexts/UserContext";

function useLoggedInUser() {
  const userContext = useContext(UserContext);
  return userContext.userInfo;
}

export default useLoggedInUser;
