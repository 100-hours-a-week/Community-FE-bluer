const END_POINT = "http://localhost:5501/proxy";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const restClient = {
  get: async (url, params = {}, config = {}) => {
    const response = await fetch(`${END_POINT}${url}`, {
      method: "GET",
      ...commonConfig,
      ...config,
    });

    return response.json();
  },
};
