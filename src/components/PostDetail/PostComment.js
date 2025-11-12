function PostComment({ $target, onSubmit }) {
  this.$element = document.createElement("div");
  this.$element.classList.add("post-comment-container");
  $target.appendChild(this.$element);

  this.state = {
    content: "",
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.handleInput = event => {
    this.setState({ content: event.target.value });
  };

  this.handleSubmit = event => {
    event.preventDefault();

    const trimmed = this.state.content.trim();
    if (!trimmed) return;

    onSubmit?.(trimmed);
    this.setState({ content: "" });
  };

  this.render = () => {
    const hasText = this.state.content.trim().length > 0;
    const buttonBackground = hasText ? "#7F6AEE" : "#ACA0EB";
    const disabledAttribute = hasText ? "" : "disabled";

    this.$element.innerHTML = `
      <div class="post-comment-textarea-wrapper">
        <textarea
          class="post-comment-textarea"
          placeholder="댓글을 남겨주세요!">${this.state.content}</textarea>
      </div>
      <div class="divider"></div>
      <div class="post-comment-submit-button-container">
        <button
          type="button"
          class="post-comment-submit-button"
          ${disabledAttribute}
          style="background-color: ${buttonBackground};">
          <span>댓글 등록</span>
        </button>
      </div>
    `;

    const $textarea = this.$element.querySelector(".post-comment-textarea");
    const $submitButton = this.$element.querySelector(
      ".post-comment-submit-button"
    );

    $textarea.addEventListener("input", this.handleInput);
    $submitButton.addEventListener("click", this.handleSubmit);
  };

  this.render();
}

export default PostComment;
