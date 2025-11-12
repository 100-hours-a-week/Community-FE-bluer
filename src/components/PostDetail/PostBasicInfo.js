export default function PostBasicInfo({ $target, post }) {
  this.$element = document.createElement("div");
  this.$element.classList.add("post-basic-info");
  this.$target = $target;

  this.$target.appendChild(this.$element);

  this.state = {
    title: "",
    authorName: "",
    authorProfileImageUrl: "",
    createdAt: "",
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.render = () => {
    // console.log("postbasicinfo render");
    const { title, authorName, authorProfileImageUrl, createdAt } = this.state;
    this.$element.innerHTML = `
      <div class="post-basic-info">
        <h1 class="post-title bold">${title ?? ""}</h1>
        <div class="post-author-info">
          <div class="post-author-container left">
            <div class="post-author-container">
              <div class="post-avatar avatar">
              ${authorProfileImageUrl ? `<img src=${authorProfileImageUrl} />` : ""}
              </div>
              <span class="post-author bold">${authorName ?? "-"}</span>
            </div>
            <span class="post-info-item">${createdAt ?? "-"}</span>
          </div>
          <div class="post-author-container right">
            <button class="post-author-container-button post-modify">수정</button>
            <button class="post-author-container-button post-delete">삭제</button>
          </div>
        </div>
      </div>
    `;
  };

  this.render();
}
