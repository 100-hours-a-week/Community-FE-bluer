const listeners = new Set();

const state = {
  isLoggedIn: false,
  userToken: null,
};

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
