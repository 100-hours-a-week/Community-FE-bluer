function Header({ $target, initialState }) {
  this.target = $target;
  this.state = initialState;

  this.render = () => {
    this.target.innerHTML = `
      <header class="header">
        <h1>아무 말 대잔치</h1>
      </header>
    `;
  };
}

export default Header;
