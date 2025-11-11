import { showToast, truncateText } from "../lib/utils.js";
import { POST_TITLE_MAX_LENGTH } from "../lib/constants.js";
import PostListItem from "../components/PostListItem.js";
import { apiManager } from "../lib/api/apiManager.js";

function PostList({ $target, initialState, moveTo, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;
  this.moveTo = moveTo;

  this.state = {
    ...initialState,
    posts: [],
  };

  this.$postListPage = document.createElement("div");
  this.$postListPage.classList.add("post-list-page", "page-layout");
  this.$introductionArea = document.createElement("div");
  this.$introductionArea.classList.add("introduction");
  this.$addPostButtonContainer = document.createElement("div");
  this.$addPostButtonContainer.classList.add("add-post-button-container");
  this.$postList = document.createElement("ul");
  this.$postList.classList.add("post-list");

  this.shortenTitle = title => {
    return title.length > POST_TITLE_MAX_LENGTH
      ? truncateText(title, POST_TITLE_MAX_LENGTH)
      : title;
  };

  this.render = () => {
    this.$introductionArea.innerHTML = `
    <span>안녕하세요,</span>
    <br />
    <div>
    아무 말 대잔치
    <span class="bold">게시판</span> 입니다.
    </div>
    `;

    this.$addPostButtonContainer.innerHTML = `
    <button class="add-post-button">
    <span> 게시글 작성 </span>
    </button>
    `;

    // NOTE: check this logic after applying infinite scroll
    this.$postList.innerHTML = "";
    this.state.posts?.forEach(post => {
      const shortenedPost = { ...post, title: this.shortenTitle(post.title) };

      new PostListItem({
        $target: this.$postList,
        post: shortenedPost,
        onClick: this.handleClickPost,
      });
    });

    this.$postListPage.append(
      this.$introductionArea,
      this.$addPostButtonContainer,
      this.$postList
    );

    this.target.appendChild(this.$postListPage);
  };

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
  };

  this.onClickPost = event => {
    const $post = event.target.closest(".post");

    if (!$post) {
      return;
    }

    const postId = $post?.dataset?.postId;

    this.moveTo("post-detail", { postId });
  };

  this.bindEvents = () => {
    this.$postList.addEventListener("click", this.onClickPost);
  };

  this.getPosts = async () => {
    try {
      const { data } = await apiManager.getPosts();
      const { posts } = data;

      this.setState({ posts: [...posts] });
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.init = async () => {
    await this.getPosts();

    this.render();
    this.bindEvents();
  };
}

export default PostList;
