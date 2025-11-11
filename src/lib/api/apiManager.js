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

  getDuplicatedNickname: ({ nickname = null, email = null }) => {
    const params = { nickname, email };
    if (!nickname) {
      delete params.nickname;
    }
    if (!email) {
      delete params.email;
    }
    return restClient.get("/users/check", params);
  },
  // Post
  getPost: postId => {
    const params = {};

    return restClient.get(`/posts/${postId}`, params);
  },
};
