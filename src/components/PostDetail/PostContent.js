import Divider from "../Divider.js";

export default function PostContent({ $target, post }) {
  this.$element = document.createElement("div");
  this.$element.classList.add("post-basic-info");
  this.$target = $target;

  this.$target.appendChild(this.$element);

  // new Divider({ $target: this.$target }

  // console.log(`PostContent's initialState`);
  // console.log(initialState);
  this.state = {
    // content: "",
    ...post,
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };

    this.render();
  };

  this.render = () => {
    console.log("Post Content Render");

    const { content } = this.state;

    this.$element.innerHTML = `
      <div class="post-content">
        <div class="post-content-image"></div>
        <p>${content ?? ""}</p>
      </div>
    `;

    // this.$target.appendChild(this.$element);
  };

  this.render();
}
