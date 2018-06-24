export default function Loop() {
  this.handlers = [];
  this.prev = window.performance.now();

  const tick = (timestamp) => {
    this.handlers.forEach(handler => handler(timestamp - this.prev));
    this.request = window.requestAnimationFrame(tick);
    this.prev = timestamp;
  };

  window.requestAnimationFrame(tick);
}

Loop.prototype.subscribe = function (callback) {
  this.handlers.push(callback);
};

Loop.prototype.unsubscribe = function (callback) {
  this.handlers.filter(handler => handler !== callback);
};

Loop.prototype.stop = function () {
  this.handlers.forEach(handler => this.unsubscribe(handler));
  window.cancelAnimationFrame(this.request);
};
