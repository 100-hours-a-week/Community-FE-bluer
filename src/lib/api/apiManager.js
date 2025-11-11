import { restClient } from "./restClient.js";

export const apiManager = {
  getPost: postId => {
    const params = {};

    return restClient.get(`/posts/${postId}`, params);
  },
};
