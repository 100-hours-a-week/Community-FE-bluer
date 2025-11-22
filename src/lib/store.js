const listeners = new Set();

const state = {
  isLoggedIn: false,
  userToken: null,
  userId: null,
  // example: {page: 'post-detail', query: {id: 1}}
  // history: [{ page: "signup", query: null }],
  currentPage: null,
};

const VALID_ACTIONS = ["LOGIN", "LOGOUT", "SET_CURRENT_PAGE"];

const setState = (newState, type) => {
  const prevState = { ...state };
  Object.assign(state, newState);

  const changed = Object.keys(newState).some(
    key => prevState[key] !== state[key]
  );

  if (changed) {
    listeners.forEach(listener => listener({ ...state }, type, newState));
  }
};

export const getState = () => ({ ...state });

export const getCurrentPageInfo = () =>
  getState().history[getState().history.length - 1];

export const subscribe = listener => {
  listeners.add(listener);
  listener({ ...state });
  return () => listeners.delete(listener);
};

export const dispatch = (type, payload = {}) => {
  if (!VALID_ACTIONS.includes(type)) {
    console.error(`Invalid dispatch type: "${type}"`);
    return;
  }

  switch (type) {
    case "LOGIN":
      setState(
        {
          isLoggedIn: true,
          userToken: payload.userToken,
          userId: payload.userId,
        },
        type
      );
      break;

    case "LOGOUT":
      setState({ isLoggedIn: false, userToken: null }, type);
      break;

    case "SET_CURRENT_PAGE":
      setState({ currentPage: payload.page }, type);
      break;

    default:
      break;
  }
};
