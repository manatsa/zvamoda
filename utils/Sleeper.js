const Sleeper = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default Sleeper;
