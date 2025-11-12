import { restClient } from "./restClient.js";

export const apiManager = {
  // Customer

  login: ({ email, password }) => {
    const params = { email, password };

    return restClient.post("/users/signin", params);
  },

  getUserProfile: () => {
    return restClient.get("/users/profile");
  },

  checkAvailability: ({ nickname = null, email = null }) => {
    const params = { nickname, email };
    if (!nickname) {
      delete params.nickname;
    }
    if (!email) {
      delete params.email;
    }
    return restClient.get("/users/check", params);
  },
  updatePassword: ({ password }) => {
    const params = { password };
    return restClient.put("/users/password", params);
  },
  updateProfile: ({ nickname }) => {
    const params = { nickname };
    return restClient.put("/users/profile", params);
  },
  withdrawProfile: () => {
    return restClient.delete("/users/profile");
  },
  // Post
  getPost: postId => {
    const params = {};

    return restClient.get(`/posts/${postId}`, params);
  },
  getPosts: (cursor = null, size = null) => {
    const params = { cursor, size };
    if (!cursor) {
      delete params.cursor;
    }
    if (!size) {
      delete params.size;
    }

    return restClient.get("/posts", params);
  },
  addPost: ({ title, content }) => {
    const params = { title, content };
    return restClient.post("/posts", params);
  },
  updatePost: ({ postId, title, content }) => {
    const params = { title, content };
    return restClient.put(`/posts/${postId}`, params);
  },
  deletePost: postId => {
    const params = {};
    return restClient.delete(`/posts/${postId}`, params);
  },

  // Comments
  getComments: postId => {
    const params = {};

    return restClient.get(`/post/${postId}/comments`, params);
  },
  postComment: ({ postId, content }) => {
    const params = { content };
    return restClient.post(`/post/${postId}/comments`, params);
  },
  deleteComment: ({ postId, commentId }) => {
    const params = {};
    return restClient.delete(`/post/${postId}/comments/${commentId}`, params);
  },
  updateComment: ({ postId, commentId, content }) => {
    const params = { content };
    return restClient.put(`/post/${postId}/comments/${commentId}`, params);
  },
};
