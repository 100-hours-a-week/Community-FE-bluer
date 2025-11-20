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
  handleRoute(location.pathname);
};

export const handleRoute = path => {
  let RouteComponent = null;
  let params = {};

  for (const pattern in routes) {
    const paramNames = [];

    const regex = new RegExp(
      "^" +
        pattern.replace(/:([^/]+)/g, (_, key) => {
          paramNames.push(key);
          return "([^/]+)";
        }) +
        "$"
    );

    const match = path.match(regex);

    if (match) {
      RouteComponent = routes[pattern];

      paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });

      break;
    }
  }

  if (!RouteComponent) {
    $page.innerHTML = "<h1>404 Not Found</h1>";
    return;
  }

  $page.innerHTML = "";

  new RouteComponent({
    $target: $page,
    moveTo: moveToPage,
    params,
  });
};

export const initRouteHandler = () => {
  window.addEventListener("popstate", () => {
    handleRoute(location.pathname);
  });

  // Run route handler for the first time
  handleRoute(location.pathname);
};
