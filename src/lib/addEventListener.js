"use strict";
var IS_CLIENT = typeof window !== 'undefined';
var noop = function() {};

function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent('on' + eventName, function() {
      handler.call(el);
    });
  }
}

module.exports = IS_CLIENT ? addEventListener : noop;
