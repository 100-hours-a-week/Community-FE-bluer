import Header from "./src/components/Header.js";
import Login from "./src/pages/Login.js";
import { $ } from "./src/utils/index.js";

function App() {
  this.header = new Header({
    $target: $("#header"),
    initialState: {},
  });
  this.login = new Login({
    $target: $("#app"),
    initialState: {},
  });

  this.render = () => {
    this.header.render();
    this.login.render();
    console.log("this.render");
  };

  this.init = () => {
    this.render();
  };
}

const app = new App();

app.init();
