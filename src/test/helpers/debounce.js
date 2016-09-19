// testable version of debounce as lodash.debounce() enforces wait time

// testable version of debounce as lodash.debounce() enforces wait time

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

export default debounce;