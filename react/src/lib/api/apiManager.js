import { restClient } from "./restClient.js";

export const apiManager = {
  // Customer

  login: ({ email, password }) => {
    const params = { email, password };

    return restClient.post("/users/signin", params);
  },
  signUp: ({ email, password, nickname, profileImageUrl }) => {
    const params = { email, password, nickname, profileImageUrl };

    return restClient.post("/users/signup", params);
  },
  signOut: () => {
    const params = {};

    return restClient.post("/users/signout", params);
  },
  getUserProfile: () => {
    return restClient.get("/users/profile");
  },

  getEmailAvailable: ({ email = null }) => {
    const params = { email };

    return restClient.get("/users/check", params);
  },
  getNicknameAvailable: ({ nickname }) => {
    const params = { nickname };

    return restClient.get("/users/check", params);
  },
  updatePassword: ({ password }) => {
    const params = { password };
    return restClient.put("/users/password", params);
  },
  getIsPasswordMatched: ({ password }) => {
    const params = { password };

    return restClient.post("/users/password/check", params);
  },
  updateProfile: ({ nickname, profileImageUrl }) => {
    const params = { nickname, profileImageUrl };

    return restClient.put("/users/profile", params);
  },
  withdrawProfile: () => {
    return restClient.delete("/users/profile");
  },

  // Post
  getPost: (postId) => {
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
  addPost: ({ title, content, imageUrl }) => {
    const params = { title, content, imageUrl };
    return restClient.post("/posts", params);
  },
  updatePost: ({ postId, title, content, imageUrl }) => {
    const params = { title, content, imageUrl };
    return restClient.put(`/posts/${postId}`, params);
  },
  deletePost: (postId) => {
    const params = {};
    return restClient.delete(`/posts/${postId}`, params);
  },
  addLikePost: (postId) => {
    const params = {};
    return restClient.post(`/posts/${postId}/likes`, params);
  },
  deleteLikePost: (postId) => {
    const params = {};
    return restClient.delete(`/posts/${postId}/likes`, params);
  },

  // Comments
  getComments: (postId) => {
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
