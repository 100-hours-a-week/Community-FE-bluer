import { matchPath, Navigate, useLocation } from "react-router-dom";
import {
  ChangePasswordPage,
  LoginPage,
  JoinPage,
  PostListPage,
  PostCreatePage,
  PostDetailPage,
  PostEditPage,
  UserInfoPage,
} from "@/pages";
import ChangeNicknamePage from "@/pages/ChangeNicknamePage";

export const routePatterns = [
  { pattern: "/", name: "post-list", page: <PostListPage /> },
  { pattern: "/login", name: "login", page: <LoginPage />, guestOnly: true },
  {
    pattern: "/join",
    name: "join-redirect",
    page: <Navigate to="/join/email" replace />,
    guestOnly: true,
  },
  { pattern: "/join/:step", name: "join", page: <JoinPage />, guestOnly: true },
  { pattern: "/posts/create", name: "post-create", page: <PostCreatePage />, protected: true },
  { pattern: "/posts/:id", name: "post-detail", page: <PostDetailPage /> },
  { pattern: "/posts/:id/edit", name: "post-edit", page: <PostEditPage />, protected: true },
  { pattern: "/user/info", name: "user-info", page: <UserInfoPage />, protected: true },
  {
    pattern: "/user/info/change-password",
    name: "change-password",
    page: <ChangePasswordPage />,
    protected: true,
  },
  {
    pattern: "/user/info/change-nickname",
    name: "change-nickname",
    page: <ChangeNicknamePage />,
    protected: true,
  },
];

function useRouteName() {
  const location = useLocation();
  const pathname = location.pathname;

  for (const { pattern, name } of routePatterns) {
    const matched = matchPath(pattern, pathname);

    if (matched) {
      return name;
    }
  }

  return null;
}

export default useRouteName;
