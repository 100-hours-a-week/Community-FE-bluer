import Header from "./components/Header.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import PostList from "./pages/PostList.js";
import UserInfo from "./pages/UserInfo.js";
import { $ } from "./lib/dom.js";

function App() {
  this.state = {
    // currentPage: "post-list", // login, signup, withdrawal, user-info, change-password, post-list, post, post-create
    currentPage: "user-info",
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
        break;
      case "withdrawal":
        break;
      case "post-list":
        this.postList.init();
        break;
      case "user-info":
        this.userInfo.init();
        break;
      case "post":
        break;
      case "post-create":
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
