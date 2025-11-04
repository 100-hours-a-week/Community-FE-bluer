import Header from "./src/Header.js";
import Login from "./src/Login.js";
import { $ } from "./src/utils.js";

function App() {
  this.header = new Header({
    $target: $("#header"),
    initialState: {},
  });
  this.login = new Login({
    $target: $("#app"),
    initialState: {},
  });

  this.render = () => {};

  this.init = () => {
    this.render();
  };
}

const app = new App();

app.init();
