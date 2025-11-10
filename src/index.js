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
import { LOGIN_DELAY_MILLISECONDS } from "./lib/constants.js";

function App() {
  const $app = $("#app");

  this.login = ({ email, password }) => {
    try {
      // TODO: 로그인 API 요청
      if (email === "test@test.com" && password === "Testtest1!") {
        // SUCCESS CASE
        $(".submit-button").classList.add("isLoading");
        // setTimeout(() => {
        dispatch("LOGIN", { userToken: "LOGIN_SUCCESS_TOKEN" });
        // }, LOGIN_DELAY_MILLISECONDS);
      }
    } catch (error) {
      // TODO: 아이디 또는 비밀번호를 확인해 주세요
      console.error("로그인 중 오류 발생:", error);
    }
  };

  // TODO: modulation as routing module
  this.moveTo = page => {
    dispatch("PUSH_STATE", { page });

    this.render();
  };

  this.header = new Header({
    $target: $("#app"),
    moveTo: page => {
      this.moveTo(page);
    },
  });

  const pages = {
    login: new LoginPage({
      $target: $app,
      moveTo: this.moveTo,
      login: this.login,
    }),
    signup: new SignupPage({ $target: $app, moveTo: this.moveTo }),
    "post-list": new PostListPage({ $target: $app, moveTo: this.moveTo }),
    "post-detail": new PostDetailPage({ $target: $app }),
    "post-create": new PostCreatePage({ $target: $app }),
    "post-edit": new PostEditPage({ $target: $app }),
    "user-info": new UserInfoPage({ $target: $app }),
    "change-password": new ChangePasswordPage({ $target: $app }),
  };

  this.renderPage = () => {
    const { history } = getState();
    const currentPage = history[history.length - 1];
    const page = pages[currentPage];

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
