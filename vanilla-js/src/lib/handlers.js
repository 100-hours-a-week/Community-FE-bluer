export const handleInput = (event, prevState, setState) => {
  const { name, value } = event.target;

  if (prevState[name] !== undefined) {
    setState({ ...prevState, [name]: value });
  }
};
