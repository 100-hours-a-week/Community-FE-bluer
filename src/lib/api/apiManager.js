import { restClient } from "./restClient.js";

export const apiManager = {
  // Customer

  login: ({ email, password }) => {
    const params = { email, password };

    return restClient.post("/users/signin", params);
  },

  // Post
  getPost: postId => {
    const params = {};

    return restClient.get(`/posts/${postId}`, params);
  },
};
