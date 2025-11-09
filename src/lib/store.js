const listeners = new Set();

const state = {
  isLoggedIn: false,
  userToken: null,
  history: ["login"],
};

const VALID_ACTIONS = ["LOGIN", "LOGOUT", "PUSH_STATE", "POP_STATE"];

export const getState = () => ({ ...state });

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
      // payload: {token: "sample-user-token"}
      setState(
        {
          isLoggedIn: true,
          userToken: payload.token,
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
      const pushedHistory = [...state.history, payload.page];

      setState({ history: pushedHistory }, type);
      break;

    case "POP_STATE":
      const poppedHistory = [...state.history].pop();

      setState({ history: poppedHistory }, type);
      break;
    default:
      break;
  }
};
