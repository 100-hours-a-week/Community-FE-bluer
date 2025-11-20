import {
  ChangePassword,
  Login,
  PostCreate,
  PostDetail,
  PostEdit,
  PostList,
  Signup,
  UserInfo,
} from "../pages/index.js";
import { $ } from "./dom.js";

const $page = $("#page");
const routes = {
  "/": PostList,
  "/posts": PostList,
  "/posts/create": PostCreate,
  "/posts/:postId": PostDetail,
  "/posts/:postId/edit": PostEdit,
  "/user/info": UserInfo,
  "/user/change-password": ChangePassword,
  "/login": Login,
  "/signup": Signup,
};

export const moveToPage = url => {
  history.pushState(null, "", url);
  handleRoute(location.pathname, location.search);
};

export const handleRoute = (path, search) => {
  const RouteComponent = routes[path];

  if (!RouteComponent) {
    // TODO: 404
    $page.innerHTML = "<h1>404 Not Found</h1>";
    return;
  }

  const query = new URLSearchParams(search);

  new RouteComponent({
    $target: $page,
    moveTo,
  });
};

export const initRouteHandler = () => {
  window.addEventListener("popstate", () => {
    handleRoute(location.pathname, location.search);
  });

  // Run route handler for the first time
  handleRoute(location.pathname, location.search);
};
