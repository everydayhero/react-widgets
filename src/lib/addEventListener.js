const IS_CLIENT = typeof window !== 'undefined';

export default function addEventListener(eventName, handler, el) {
  if (!IS_CLIENT) return;

  el = el || window;
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent('on' + eventName, function() {
      handler.call(el);
    });
  }
}
