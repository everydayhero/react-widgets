"use strict";
var IS_CLIENT = typeof window !== 'undefined';
var noop = function() {};

function addEventListener(eventName, handler, el) {
  el = el || window;
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent('on' + eventName, function() {
      handler.call(el);
    });
  }
}

module.exports = IS_CLIENT ? addEventListener : noop;
