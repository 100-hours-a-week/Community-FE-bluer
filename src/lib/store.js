const listeners = new Set();

let state = {
  isLoggedIn: false,
  userId: null,
};

const VALID_ACTIONS = ["LOGIN", "LOGOUT", "ROUTE_CHANGE"];

const setState = (newState, type) => {
  const prevState = { ...state };
  state = { ...state, ...newState };

  const changed = Object.keys(newState).some(
    key => prevState[key] !== state[key]
  );

  if (changed) {
    listeners.forEach(listener => listener({ ...state }, type, newState));
  }
};

export const getState = () => ({ ...state });

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
          userId: payload.userId,
        },
        type
      );
      break;

    case "LOGOUT":
      setState(
        {
          isLoggedIn: false,
        },
        type
      );
      break;

    case "ROUTE_CHANGE":
      listeners.forEach(listener => listener({ ...state }, type, payload));
      break;

    default:
      break;
  }
};
