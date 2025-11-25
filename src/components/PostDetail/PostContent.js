import { createElement } from "../../lib/dom.js";

export default function PostContent({ $target, post }) {
  this.$target = $target;

  this.$element = createElement("div", {
    class: "post-content",
  });

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

    this.$element.innerHTML = "";

    if (postImageUrl) {
      const postImage = createElement(
        "div",
        {
          class: "post-content-image",
        },
        [
          createElement("img", {
            src: postImageUrl,
          }),
        ]
      );

      this.$element.appendChild(postImage);
    }

    const postText = createElement("p", {
      text: content,
    });

    this.$element.appendChild(postText);
  };
}
