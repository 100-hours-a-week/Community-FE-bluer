import { $ } from "../../lib/dom.js";

function PostComment({ $target, onSubmit }) {
  this.$target = $target;
  this.$element = document.createElement("div");
  this.$element.classList.add("post-comment-container");
  this.$target.appendChild(this.$element);

  this.state = {
    content: "",
    isEditMode: false,
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };

    const $button = this.$element.querySelector("button");
    const enabled = this.state.content.length > 0;

    $button.disabled = !enabled;
    $button.classList.toggle("active", enabled);
  };

  this.setEditMode = content => {
    this.setState({ content, isEditMode: true });
    const $textarea = $("textarea", this.$element);
    const $text = $(".button-text");

    $text.innerText = "댓글 수정";
    $textarea.innerText = content;
  };

  this.handleInput = event => {
    this.setState({ content: event.target.value });
  };

  this.handleSubmit = () => {
    onSubmit(this.state.content);

    this.init();
  };

  this.bindEvents = () => {
    const $textarea = $("textarea", this.$element);
    const $button = $("button", this.$element);

    const autoResize = target => {
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    };

    $textarea.addEventListener("input", e => {
      this.handleInput(e);
      autoResize(e.target);
    });

    $button.addEventListener("click", this.handleSubmit);
  };

  this.render = () => {
    this.$element.innerHTML = `
      <div class="post-comment-textarea-wrapper">
        <textarea class="post-comment-textarea" placeholder="댓글을 남겨주세요!"></textarea>
        <div class="post-comment-submit-button-container">
          <button type="button" class="post-comment-submit-button" disabled>
            <span class="button-text">등록</span>
          </button>
        </div>
      </div>
    `;
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default PostComment;
