import { createElement } from "../../lib/dom.js";
import { formatToK } from "../../lib/utils.js";

function PostStats({ $target, post, handleClick }) {
  this.$element = document.createElement("ul");
  this.$element.classList.add("post-stats");
  $target.appendChild(this.$element);

  this.state = {
    ...post,
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.handleClick = () => {
    handleClick();
  };

  this.cleanUp = () => {
    const $button = this.$element.querySelector(".post-like-button");
    if ($button) {
      $button.removeEventListener("click", this.handleClick);
    }
  };

  this.render = () => {
    const { likeCount, viewCount, commentCount, likedByMe } = this.state;
    const formatCount = value => (value && value > 0 ? formatToK(value) : 0);

    this.$element.innerHTML = "";

    const likeItem = createElement("li", {}, [
      createElement(
        "button",
        {
          class: "post-stats-item post-like-button",
          event: [
            {
              eventName: "click",
              handler: this.handleClick,
            },
          ],
        },
        [
          createElement("i", {
            class: `fa-${likedByMe ? "solid" : "regular"} fa-heart fa-lg`,
          }),
          createElement("span", {
            class: "item-content",
            text: formatCount(likeCount),
          }),
        ]
      ),
    ]);

    const commentItem = createElement("li", { class: "post-stats-item" }, [
      createElement("i", {
        class: "fa-regular fa-comment fa-lg",
      }),
      createElement("span", {
        class: "item-content",
        text: formatCount(commentCount),
      }),
    ]);

    const viewItem = createElement("li", { class: "post-stats-item" }, [
      createElement("i", {
        class: "fa-solid fa-chart-column fa-lg",
      }),
      createElement("span", {
        class: "item-content",
        text: formatCount(viewCount),
      }),
    ]);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(likeItem);
    fragment.appendChild(commentItem);
    fragment.appendChild(viewItem);

    this.$element.appendChild(fragment);
  };

  this.render();
}

export default PostStats;
