import { Navigate } from "react-router-dom";
import useLoggedInUser from "@/contexts/useLoggedInUser";

export default function GuestOnlyRoute({ children }) {
  const { user } = useLoggedInUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
