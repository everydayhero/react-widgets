const IS_CLIENT = typeof window !== 'undefined';

export default function removeEventListener(eventName, handler, el) {
  if (!IS_CLIENT) return;

  el = el || window;
  if (el.removeEventListener) {
    el.removeEventListener(eventName, handler);
  } else {
    el.detachEvent('on' + eventName, function() {
      handler.call(el);
    });
  }
}
