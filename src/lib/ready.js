function ready(f) {
  if (document.readyState == 'complete') {
    f();
  } else {
    setTimeout(ready.bind(null, f), 9);
  }
}

export default ready;
