import { getState } from "../lib/store.js";

function Header({ $target, initialState }) {
  this.target = $target;
  this.state = { ...initialState, isLoggedIn: false };
  this.$header = document.createElement("header");

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.render = () => {
    // TODO: 로그인 상태에 따른 조건부 렌더링
    this.$header.classList.add("header");
    this.$header.innerHTML = `
      <h1>아무 말 대잔치 :${this.state.isLoggedIn ? "로그인" : "로그인 안 함"}</h1>
      `;
    this.target.appendChild(this.$header);
  };

  this.init = () => {
    const { isLoggedIn } = getState();
    this.setState({ isLoggedIn });

    this.render();
  };
}

export default Header;
