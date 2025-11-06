function Header({ $target, initialState }) {
  this.target = $target;
  this.state = initialState;
  this.$header = document.createElement("header");

  this.render = () => {
    this.$header.classList.add("header");
    this.$header.innerHTML = `
      <h1>아무 말 대잔치</h1>
    `;
    this.target.appendChild(this.$header);
  };

  this.init = () => {
    this.render();
  };
}

export default Header;
