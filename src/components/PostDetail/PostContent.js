export default function PostContent({ $target, post }) {
  this.$element = document.createElement("div");
  this.$element.classList.add("post-content");
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
    const { content, postImageUrl } = this.state;

    this.$element.innerHTML = `
        ${
          postImageUrl
            ? `<div class="post-content-image"><img src="${postImageUrl}" /></div>`
            : ""
        }
        <p>${content ?? ""}</p>
    `;
  };

  this.render();
}
