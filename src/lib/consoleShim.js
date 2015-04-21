"use strict";
var noop = function() {};

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

module.exports = window.console;
