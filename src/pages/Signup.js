import { $ } from "../utils/index.js";

function Signup() {
  this.render = () => {
    $("#app").innerHTML = "<h1>Signup Page</h1>";
  };
  this.init = () => {
    console.log("Signup 페이지입니다.");
  };
}

export default Signup;
