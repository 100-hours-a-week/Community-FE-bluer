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
  const $app = $("#app");

  this.state = {
    // // login, signup, user-info, change-password, post-list, post, post-create
    currentPage: "post-create",
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

  const pages = {
    login: new Login({ $target: $app, moveTo: this.moveTo }),
    signup: new Signup({ $target: $app }),
    "post-list": new PostList({ $target: $app }),
    "post-detail": new PostDetail({ $target: $app }),
    "post-create": new PostCreate({ $target: $app }),
    "post-edit": new PostEdit({ $target: $app }),
    "user-info": new UserInfo({ $target: $app }),
    "change-password": new ChangePassword({ $target: $app }),
  };

  this.renderPage = () => {
    this.header.render();
    const page = pages[this.state.currentPage];

    if (page?.init) {
      page.init();
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
