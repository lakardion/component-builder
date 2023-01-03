/**
 *
 * @param {Function} fn
 * @param {number} timeoutMS
 * @returns
 */
export const debounce = (fn, timeoutMS) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), timeoutMS);
  };
};
