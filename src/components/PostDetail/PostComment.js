import { $ } from "../../lib/dom.js";

function PostComment({ $target, onSubmit }) {
  this.$target = $target;
  this.$element = document.createElement("div");
  this.$element.classList.add("post-comment-container");
  this.$target.appendChild(this.$element);

  this.$textarea = null;
  this.$button = null;

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

  this.handleTextArea = event => {
    const autoResize = target => {
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    };

    this.handleInput(event);
    autoResize(event.target);
  };

  this.bindEvents = () => {
    this.$textarea.addEventListener("input", this.handleTextArea);
    this.$button.addEventListener("click", this.handleSubmit);
  };

  this.cleanUp = () => {
    this.$textarea.removeEventListener("input", this.handleTextArea);
    this.$button.removeEventListener("click", this.handleSubmit);
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

    this.$textarea = $("textarea", this.$element);
    this.$button = $("button", this.$element);
  };

  this.init = () => {
    this.render();
    this.bindEvents();
  };

  this.init();
}

export default PostComment;
