import Header from "./components/Header.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { $ } from "./utils/dom.js";

function App() {
  this.state = {
    currentPage: "signup", // login, signup, withdrawal, change-password, post-list, post, post-create
    pageState: ["signup"],
  };

  this.moveTo = page => {
    this.state.pageState.push(page);
    this.state.currentPage = page;

    this.render();
  };

  this.header = new Header({
    $target: $("#app"),
    initialState: {},
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

  this.renderPage = () => {
    this.header.render();

    switch (this.state.currentPage) {
      case "login":
        this.login.init();
        break;
      case "signup":
        this.signup.init();
        break;
      default:
        break;
    }
  };

  this.render = () => {
    $("#app").innerHTML = "";
    this.renderPage();
  };

  this.init = () => {
    this.render();
  };
}

const app = new App();

app.init();
