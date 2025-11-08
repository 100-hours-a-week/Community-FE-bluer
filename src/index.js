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
import { dispatch, subscribe } from "./lib/store.js";
import { LOGIN_DELAY_MILLISECONDS } from "./lib/constants.js";

function App() {
  const $app = $("#app");

  this.state = {
    // // login, signup, user-info, change-password, post-list, post, post-create
    currentPage: "login",
    pageState: ["post-list"],
    isLoggedIn: false,
  };

  this.login = ({ email, password }) => {
    try {
      // TODO: 로그인 API 요청
      if (email === "test@test.com" && password === "Testtest1!") {
        // SUCCESS CASE
        $(".submit-button").classList.add("isLoading");
        setTimeout(() => {
          dispatch("LOGIN", { userToken: "LOGIN_SUCCESS_TOKEN" });
        }, LOGIN_DELAY_MILLISECONDS);
      }
    } catch (error) {
      // TODO: 아이디 또는 비밀번호를 확인해 주세요
      console.error("로그인 중 오류 발생:", error);
    }
  };

  this.moveTo = page => {
    this.state.pageState.push(page);
    this.state.currentPage = page;

    this.render();
  };

  this.header = new Header({
    $target: $("#app"),
    initialState: {
      isLoggedIn: this.state.isLoggedIn,
    },
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
    signup: new SignupPage({ $target: $app }),
    "post-list": new PostListPage({ $target: $app, moveTo: this.moveTo }),
    "post-detail": new PostDetailPage({ $target: $app }),
    "post-create": new PostCreatePage({ $target: $app }),
    "post-edit": new PostEditPage({ $target: $app }),
    "user-info": new UserInfoPage({ $target: $app }),
    "change-password": new ChangePasswordPage({ $target: $app }),
  };

  this.renderPage = () => {
    const page = pages[this.state.currentPage];

    if (page?.init) {
      this.header.init();
      page.init();
    }
  };

  this.render = () => {
    $("#app").innerHTML = "";
    this.renderPage();
  };

  this.init = () => {
    subscribe((globalState, type) => {
      if (type === "LOGIN") {
        this.state.isLoggedIn = true;
        this.moveTo("post-list");
      } else if (type === "LOGOUT") {
        this.state.isLoggedIn = false;
        this.moveTo("login");
      }
    });

    this.render();
  };
}

const app = new App();

app.init();
