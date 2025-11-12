export default function PostContent({ $target, post }) {
  this.$element = document.createElement("div");
  this.$element.classList.add("post-basic-info");
  this.$target = $target;

  this.$target.appendChild(this.$element);

  this.state = {
    ...post,
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };

    this.render();
  };

  this.render = () => {
    const { content } = this.state;

    this.$element.innerHTML = `
      <div class="post-content">
        <div class="post-content-image"></div>
        <p>${content ?? ""}</p>
      </div>
    `;
  };

  this.render();
}
