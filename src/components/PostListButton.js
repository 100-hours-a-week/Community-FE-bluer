function PostListButton({ $target, onClick = null, text = "게시글 작성" }) {
  this.target = $target;
  this.onClick = onClick;

  this.$button = document.createElement("button");
  this.$button.className = "post-list-button";

  this.render = () => {
    this.$button.innerHTML = `<span>${text}</span>`;
  };

  this.init = () => {
    this.target.appendChild(this.$button);
    this.render();
  };

  this.init();
}

export default PostListButton;
