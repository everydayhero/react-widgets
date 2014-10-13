function ready(f) {
  document.readyState == 'complete' ? f() : setTimeout(ready.bind(null, f), 9);
}

module.exports = ready;
