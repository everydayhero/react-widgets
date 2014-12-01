"use strict";

function removeEventListener(el, eventName, handler) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, handler);
  } else {
    el.detachEvent('on' + eventName, function() {
      handler.call(el);
    });
  }
}

module.exports = removeEventListener;
