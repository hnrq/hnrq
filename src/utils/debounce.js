export default (fn, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), wait);
  };
};
