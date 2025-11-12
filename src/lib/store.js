const listeners = new Set();

const state = {
  isLoggedIn: false,
  userToken: null,
  // ex) PAGE_PATH: login, signup, user-info, change-password, post-list, post-detail, post-create
  // {page: 'post-detail', query: {id: 1}}
  history: [{ page: "post-list", query: null }],
};

const VALID_ACTIONS = ["LOGIN", "LOGOUT", "PUSH_STATE", "POP_STATE"];

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

    /*
        payload: {page: "PAGE_PATH"}
        
        ex) PAGE_PATH: login, signup, user-info, change-password, post-list, post-detail, post-create
    */
    case "PUSH_STATE":
      const newRoute = {
        page: payload.page,
        query: payload.query || null,
      };
      const pushedHistory = [...state.history, newRoute];

      setState({ history: pushedHistory }, type);
      break;

    case "POP_STATE":
      if (state.history.length > 1) {
        const poppedHistory = [...state.history];

        poppedHistory.pop();

        setState({ history: poppedHistory }, type);
      }
      break;
    default:
      break;
  }
};
