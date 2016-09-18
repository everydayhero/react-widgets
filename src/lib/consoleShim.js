let noop = function() {};

if (typeof window.console === "undefined") {
  window.console = {
    log: noop,
    warn: noop,
    error: noop,
    debug: noop,
    info: noop,
    trace: noop
  };
}

export default window.console;
