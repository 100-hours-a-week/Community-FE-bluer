import Header from "./src/Header.js";
import { $ } from "./src/utils.js";

function App() {
  this.header = new Header({
    $target: $("#app"),
    initialState: {},
  });
  this.render = () => {
    this.header.render();
  };

  this.init = () => {
    this.render();
  };
}

const app = new App();

app.init();
