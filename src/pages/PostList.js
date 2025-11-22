import { showToast, truncateText } from "../lib/utils.js";
import { POST_TITLE_MAX_LENGTH } from "../lib/constants.js";
import PostListItem from "../components/PostListItem.js";
import { apiManager } from "../lib/api/apiManager.js";
import { moveToPage } from "../lib/router.js";

function PostList({ $target, initialState, currentPage }) {
  this.target = $target;
  this.currentPage = currentPage;

  this.state = {
    ...initialState,
    posts: [],
    currentCursor: null,
    hasNext: false,
  };

  this.$postListPage = document.createElement("div");
  this.$postListPage.classList.add("post-list-page", "page-layout");
  this.$addPostButtonContainer = document.createElement("div");
  this.$addPostButtonContainer.classList.add("add-post-button-container");
  this.$postList = document.createElement("ul");
  this.$postList.classList.add("post-list");
  this.$loadMore = document.createElement("div");

  this.shortenTitle = title => {
    return title.length > POST_TITLE_MAX_LENGTH
      ? truncateText(title, POST_TITLE_MAX_LENGTH)
      : title;
  };

  this.render = () => {
    this.$addPostButtonContainer.innerHTML = `
      <button class="add-post-button">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
    `;

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
      this.$addPostButtonContainer,
      this.$postList,
      this.$loadMore
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

    moveToPage(`/posts/${postId}`);
  };

  this.onClickAddPost = () => {
    moveToPage("/posts/create");
  };

  this.appendPosts = async (cursor = null, size = null) => {
    try {
      if (this.state.currentCursor === null && this.hasNext === false) {
        this.observer.unobserve(this.$loadMore);
        return;
      }
      const { data } = await apiManager.getPosts(cursor, size);
      const { posts, nextCursor, hasNext } = data;

      this.setState({
        posts: [...this.state.posts, ...posts],
        currentCursor: nextCursor,
        hasNext,
      });

      posts?.forEach(post => {
        const shortenedPost = { ...post, title: this.shortenTitle(post.title) };

        new PostListItem({
          $target: this.$postList,
          post: shortenedPost,
          onClick: this.onClickPost,
        });
      });
    } catch (error) {
      console.error(error);
      showToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  this.handleIntersect = () => {
    if (!this.observer) {
      this.observer = new IntersectionObserver(
        async entries => {
          const entry = entries[0];
          if (!entry.isIntersecting || !this.state.hasNext) return;

          this.observer.unobserve(this.$loadMore);
          await this.appendPosts(this.state.currentCursor, 5);
          this.observer.observe(this.$loadMore);
        },
        { root: null, rootMargin: "0px 0px 200px 0px", threshold: 0 }
      );
    }
    this.observer.observe(this.$loadMore);
  };

  this.bindEvents = () => {
    this.$postList.addEventListener("click", this.onClickPost);
    this.$addPostButtonContainer.addEventListener("click", this.onClickAddPost);
  };

  this.init = async () => {
    await this.appendPosts(null, 5);

    this.render();
    this.bindEvents();
    this.handleIntersect();
  };

  this.init();
}

export default PostList;
