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
};
