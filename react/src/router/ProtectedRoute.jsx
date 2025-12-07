import { Navigate, useLocation } from "react-router-dom";
import useLoggedInUser from "@/contexts/useLoggedInUser";

export default function ProtectedRoute({ children }) {
  const { user } = useLoggedInUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
