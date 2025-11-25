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
import { dispatch } from "./store.js";

const $page = $("#page");
const routes = {
  "/": PostList,
  "/posts": PostList,
  "/posts/create": PostCreate,
  "/posts/:postId": PostDetail,
  "/posts/:postId/edit": PostEdit,
  "/user-info": UserInfo,
  "/change-password": ChangePassword,
  "/login": Login,
  "/signup": Signup,
};

let currentPageInstance = null;

const pathToRegex = path => {
  return new RegExp("^" + path.replace(/:([^/]+)/g, "([^/]+)") + "$");
};

const routeNamePatterns = [
  { regex: pathToRegex("/"), name: "post-list" },
  { regex: pathToRegex("/login"), name: "login" },
  { regex: pathToRegex("/signup"), name: "signup" },
  { regex: pathToRegex("/posts"), name: "post-list" },
  { regex: pathToRegex("/posts/create"), name: "post-create" },
  { regex: pathToRegex("/posts/:id"), name: "post-detail" },
  { regex: pathToRegex("/posts/:id/edit"), name: "post-edit" },
  { regex: pathToRegex("/user/info"), name: "user-info" },
  { regex: pathToRegex("/user/change-password"), name: "change-password" },
];

const getPageNameFromPath = path => {
  const matched = routeNamePatterns.find(r => r.regex.test(path));

  return matched?.name ?? "not-found";
};

const safeCleanUp = instance => {
  if (instance?.cleanUp) {
    try {
      instance.cleanUp();
    } catch (error) {
      console.error("Error while cleaning up previous page:", error);
    }
  }
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

  const pageName = getPageNameFromPath(location.pathname);
  dispatch("SET_CURRENT_PAGE", { page: pageName });

  if (!RouteComponent) {
    safeCleanUp(currentPageInstance);
    currentPageInstance = null;
    $page.innerHTML = "<h1>404 Not Found</h1>";
    return;
  }

  safeCleanUp(currentPageInstance);

  $page.innerHTML = "";

  currentPageInstance = new RouteComponent({
    $target: $page,
    moveTo: moveToPage,
    params,
  });
};

export const moveToPage = url => {
  if (location.pathname !== url) {
    history.pushState(null, "", url);
    handleRoute(location.pathname);
  }
};

export const initRouteHandler = () => {
  window.addEventListener("popstate", () => {
    handleRoute(location.pathname);
  });

  // Run route handler for the first time
  handleRoute(location.pathname);
};
