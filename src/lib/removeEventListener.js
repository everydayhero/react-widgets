"use strict";
var IS_CLIENT = typeof window !== 'undefined';
var noop = function() {};

function removeEventListener(eventName, handler, el) {
  el = el || window;
  if (el.removeEventListener) {
    el.removeEventListener(eventName, handler);
  } else {
    el.detachEvent('on' + eventName, function() {
      handler.call(el);
    });
  }
}

module.exports = IS_CLIENT ? removeEventListener : noop;
