import Header from "./components/Header.js";
import {
  Login,
  Signup,
  PostList,
  UserInfo,
  ChangePassword,
  PostDetail,
  PostCreate,
  PostEdit,
} from "./pages/index.js";

import { $ } from "./lib/dom.js";

function App() {
  this.state = {
    // currentPage: "post-list"
    // // login, signup, user-info, change-password, post-list, post, post-create
    currentPage: "post-edit",
    pageState: ["post-list"],
    isLoggedIn: false,
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

  this.login = new Login({
    $target: $("#app"),
    initialState: {},
    moveTo: page => {
      this.moveTo(page);
      this.render();
    },
    currentPage: this.state.currentPage,
  });

  this.signup = new Signup({
    $target: $("#app"),
    initialState: {},
  });

  this.postList = new PostList({
    $target: $("#app"),
    initialState: {},
  });

  this.userInfo = new UserInfo({
    $target: $("#app"),
    initialState: {},
  });

  this.changePassword = new ChangePassword({
    $target: $("#app"),
    initialState: {},
  });

  this.postDetail = new PostDetail({
    $target: $("#app"),
    initialState: {},
  });

  this.postCreate = new PostCreate({
    $target: $("#app"),
    initialState: {},
  });

  this.postEdit = new PostEdit({
    $target: $("#app"),
    initialState: {},
  });

  this.renderPage = () => {
    this.header.render();

    switch (this.state.currentPage) {
      case "login":
        this.login.init();
        break;
      case "signup":
        this.signup.init();
        break;
      case "change-password":
        this.changePassword.init();
        break;
      case "post-list":
        this.postList.init();
        break;
      case "user-info":
        this.userInfo.init();
        break;
      case "post-detail":
        this.postDetail.init();
        break;
      case "post-create":
        this.postCreate.init();
        break;
      case "post-edit":
        this.postEdit.init();
        break;
      default:
        break;
    }
  };

  // this.setState = newState => {
  //   this.state = { ...this.state, ...newState };
  // };
  this.render = () => {
    $("#app").innerHTML = "";
    this.renderPage();
  };

  this.init = () => {
    this.render();

    // setTimeout(() => {
    //   console.log("run");
    //   this.setState({ ...this.state, isLoggedIn: true });
    // }, 5000);
  };
}

const app = new App();

app.init();
