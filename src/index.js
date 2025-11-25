import Header from "./components/Header.js";
import { $ } from "./lib/dom.js";
import { dispatch, subscribe } from "./lib/store.js";
import { initRouteHandler, moveToPage } from "./lib/router.js";
import { apiManager } from "./lib/api/apiManager.js";
import { StatusCode } from "./lib/api/statusCode.js";

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

  this.init = async () => {
    this.header.init();

    try {
      const result = await apiManager.getUserProfile();

      if (result.status === StatusCode.OK) {
        dispatch("LOGIN");
      }
    } catch (error) {
      dispatch("LOGOUT");
    }

    subscribe((globalState, type) => {
      if (type === "LOGIN") {
        this.moveTo("posts");
      } else if (type === "LOGOUT") {
        this.moveTo("login");
      }
    });

    initRouteHandler();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();

  app.init();
});
