const END_POINT = "http://localhost:5501/proxy";
const DEFAULT_TIMEOUT = 5000;

const commonHeaders = {
  "Content-Type": "application/json",
};

const paramsSerializer = params =>
  Object.entries(params)
    .map(([key, value]) =>
      Array.isArray(value)
        ? value
            .map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
            .join("&")
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

function fetchWithTimeout(resource, options = {}) {
  const { timeout = DEFAULT_TIMEOUT } = options;

  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort();
  }, timeout);

  return fetch(resource, {
    ...options,
    signal: controller.signal,
  }).finally(() => clearTimeout(id));
}

async function extractDataFromResponse(promise) {
  const response = await promise;

  const contentType = response.headers.get("content-type");
  const data =
    contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();

  return { status: response.status, data };
}

const isFetchError = err => err?.name === "AbortError" || err instanceof Error;

async function request(url, options = {}) {
  const mergedOptions = {
    ...options,
    headers: {
      ...commonHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetchWithTimeout(
      `${END_POINT}${url}`,
      mergedOptions
    );
    return extractDataFromResponse(Promise.resolve(response));
  } catch (error) {
    console.error("[restClient error]", error);
    throw error;
  }
}

export const restClient = {
  get: (url, params = {}, config = {}) => {
    const query = paramsSerializer(params);
    const fullUrl = query ? `${url}?${query}` : url;

    return request(fullUrl, { method: "GET", ...config });
  },

  post: (url, body = {}, config = {}) => {
    return request(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...config,
    });
  },

  put: (url, body = {}, config = {}) => {
    return request(url, {
      method: "PUT",
      body: JSON.stringify(body),
      ...config,
    });
  },

  patch: (url, body = {}, config = {}) => {
    return request(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...config,
    });
  },

  delete: (url, body = {}, config = {}) => {
    return request(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      ...config,
    });
  },
};
