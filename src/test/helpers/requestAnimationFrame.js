var callbacksQueue = [];

setInterval(function () {
  for (var i = 0; i < callbacksQueue.length; i++) {
    if (callbacksQueue[i] !== false) {
      callbacksQueue[i].call(null);
    }
  }

  callbacksQueue = [];
}, 1000 / 60);

var requestAnimationFrame = function (callback) {
  return callbacksQueue.push(callback) - 1;
};

export default requestAnimationFrame;
