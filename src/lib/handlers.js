export const handleInput = (event, prevState, setState) => {
  const { name, value } = event.target;

  setState({ ...prevState, [name]: value });
};
