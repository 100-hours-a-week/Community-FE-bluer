import Header from "./components/Header.js";
import {
  Login as LoginPage,
  Signup as SignupPage,
  PostList as PostListPage,
  UserInfo as UserInfoPage,
  ChangePassword as ChangePasswordPage,
  PostDetail as PostDetailPage,
  PostCreate as PostCreatePage,
  PostEdit as PostEditPage,
} from "./pages/index.js";

import { $ } from "./lib/dom.js";
import { dispatch, getState, subscribe } from "./lib/store.js";

function App() {
  const $app = $("#app");

  // TODO: modulation as routing module
  this.moveTo = (page, query = null) => {
    dispatch("PUSH_STATE", { page, query });

    this.render();
  };

  this.toBack = () => {
    dispatch("POP_STATE");

    this.render();
  };

  this.header = new Header({
    $target: $("#app"),
    moveTo: page => {
      this.moveTo(page);
    },
    toBack: () => {
      this.toBack();
    },
  });

  this.pages = {
    login: new LoginPage({
      $target: $app,
      moveTo: this.moveTo,
    }),
    signup: new SignupPage({ $target: $app, moveTo: this.moveTo }),
    "post-list": new PostListPage({ $target: $app, moveTo: this.moveTo }),
    "post-detail": new PostDetailPage({ $target: $app, moveTo: this.moveTo }),
    "post-create": new PostCreatePage({ $target: $app }),
    "post-edit": new PostEditPage({ $target: $app }),
    "user-info": new UserInfoPage({ $target: $app }),
    "change-password": new ChangePasswordPage({ $target: $app }),
  };

  this.renderPage = () => {
    const { history } = getState();
    const currentRoute = history[history.length - 1];
    const page = currentRoute?.page
      ? this.pages[currentRoute.page]
      : this.pages.login;

    if (page?.init) {
      // this.header.init();
      page.init();
    }
  };

  this.render = () => {
    $("#app").innerHTML = "";
    this.header.render();
    this.renderPage();
  };

  this.init = () => {
    subscribe((globalState, type) => {
      if (type === "LOGIN") {
        this.moveTo("post-list");
      } else if (type === "LOGOUT") {
        this.moveTo("login");
      }
    });

    this.render();
  };
}

const app = new App();

app.init();
