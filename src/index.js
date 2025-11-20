import Header from "./components/Header.js";
import { $ } from "./lib/dom.js";
import { subscribe } from "./lib/store.js";
import { initRouteHandler, moveToPage } from "./lib/router.js";

function App() {
  const $app = $("#app");

  this.moveTo = page => {
    moveToPage(page);
  };

  this.header = new Header({
    $target: $("#header"),
    moveTo: page => {
      this.moveTo(page);
    },
  });

  this.init = () => {
    this.header.init();

    subscribe((globalState, type) => {
      if (type === "LOGIN") {
        this.moveTo("posts");
      } else if (type === "LOGOUT") {
        this.moveTo("login");
      }
    });

    initRouteHandler();
    // this.render();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();

  app.init();
});
