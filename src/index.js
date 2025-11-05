import Header from "./components/Header.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { $ } from "./utils/index.js";

function App() {
  this.state = {
    currentPage: "login", // login, signup, withdrawal, change-password, post-list, post, post-create
  };

  this.header = new Header({
    $target: $("#header"),
    initialState: {},
  });
  this.login = new Login({
    $target: $("#app"),
    initialState: {},
    moveTo: page => {
      this.state.currentPage = page;
      console.log(this.state);
      this.render();
    },
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
