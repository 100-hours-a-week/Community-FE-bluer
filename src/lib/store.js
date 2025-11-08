const listeners = new Set();

const state = {
  isLoggedIn: false,
  userToken: null,
};

const VALID_ACTIONS = ["LOGIN", "LOGOUT"];

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

export const dispatch = (type, payload) => {
  if (!VALID_ACTIONS.includes(type)) {
    console.error(`Invalid dispatch type: "${type}"`);
    return;
  }

  switch (type) {
    case "LOGIN":
      setState({ isLoggedIn: true, userToken: payload }, type);
      break;

    case "LOGOUT":
      setState({ isLoggedIn: false, userToken: null }, type);
      break;
  }
};
